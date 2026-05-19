import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { ChevronLeft } from "lucide-react";
import { format } from "date-fns";
import { EvolucaoChart } from "./EvolucaoChart";

export default async function EvolucaoExercicioPage({
  params,
}: {
  params: Promise<{ exercicioId: string }>;
}) {
  const { exercicioId } = await params;
  const supabase = await createClient();

  const { data: exercicio } = await supabase
    .from("exercicios")
    .select("*")
    .eq("id", exercicioId)
    .single();

  if (!exercicio) notFound();

  const { data: sets } = await supabase
    .from("sessao_sets")
    .select("*, sessoes_treino(data)")
    .eq("exercicio_id", exercicioId)
    .order("created_at" as never);

  type SetWithSessao = {
    id: string;
    numero_set: number;
    reps: number | null;
    carga: number | null;
    rpe: number | null;
    sessoes_treino: { data: string } | null;
  };

  // Agrupa por data: pega a melhor carga × rep (1RM estimado) de cada dia
  const porDia = new Map<string, { carga: number; reps: number; volume: number }>();

  (sets as never as SetWithSessao[] | null)?.forEach((s) => {
    const data = s.sessoes_treino?.data;
    if (!data || !s.carga || !s.reps) return;
    const existing = porDia.get(data);
    const volume = (s.carga ?? 0) * (s.reps ?? 0);
    const novoVolume = volume;
    const cargaMaxima = Math.max(existing?.carga ?? 0, s.carga ?? 0);
    const repsMaximas = Math.max(existing?.reps ?? 0, s.reps ?? 0);
    porDia.set(data, {
      carga: cargaMaxima,
      reps: repsMaximas,
      volume: (existing?.volume ?? 0) + novoVolume,
    });
  });

  const chartData = Array.from(porDia.entries())
    .map(([data, d]) => ({
      data: format(new Date(data), "dd/MM"),
      dataOriginal: data,
      cargaMax: d.carga,
      repsMax: d.reps,
      volume: d.volume,
    }))
    .sort((a, b) => a.dataOriginal.localeCompare(b.dataOriginal));

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/treinos/evolucao"
        className="inline-flex items-center gap-1 text-foreground/60 hover:text-foreground mb-4"
      >
        <ChevronLeft size={18} /> Voltar
      </Link>

      <div className="mb-6">
        <h1 className="text-3xl font-bold">{exercicio.nome}</h1>
        {exercicio.grupo_muscular && (
          <p className="text-foreground/60 mt-1 capitalize">{exercicio.grupo_muscular}</p>
        )}
      </div>

      {chartData.length === 0 ? (
        <Card>
          <p className="text-center py-8 text-foreground/60">
            Nenhum set registrado ainda pra esse exercício.
          </p>
        </Card>
      ) : (
        <>
          <Card className="mb-4">
            <h2 className="text-lg font-semibold mb-4">Carga máxima por sessão</h2>
            <EvolucaoChart data={chartData} dataKey="cargaMax" label="Carga (kg)" />
          </Card>

          <Card className="mb-4">
            <h2 className="text-lg font-semibold mb-4">Volume total por sessão</h2>
            <EvolucaoChart data={chartData} dataKey="volume" label="Volume (kg × reps)" />
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-3">Resumo</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-background rounded-lg">
                <div className="text-xs text-foreground/60">Sessões</div>
                <div className="text-2xl font-bold mt-1">{chartData.length}</div>
              </div>
              <div className="p-3 bg-background rounded-lg">
                <div className="text-xs text-foreground/60">Carga máxima</div>
                <div className="text-2xl font-bold mt-1">
                  {Math.max(...chartData.map((d) => d.cargaMax))}kg
                </div>
              </div>
              <div className="p-3 bg-background rounded-lg">
                <div className="text-xs text-foreground/60">Volume total</div>
                <div className="text-2xl font-bold mt-1">
                  {chartData.reduce((acc, d) => acc + d.volume, 0).toLocaleString()}
                </div>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
