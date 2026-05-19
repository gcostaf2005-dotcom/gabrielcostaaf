import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { ChevronLeft } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { SessaoForm } from "./SessaoForm";
import { finalizarSessao } from "../../actions";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";

export default async function SessaoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: sessao } = await supabase
    .from("sessoes_treino")
    .select("*")
    .eq("id", id)
    .single();

  if (!sessao) notFound();

  const { data: exercicios } = await supabase
    .from("exercicios")
    .select("*")
    .order("grupo_muscular")
    .order("nome");

  const { data: sets } = await supabase
    .from("sessao_sets")
    .select("*, exercicios(nome, grupo_muscular)")
    .eq("sessao_id", id)
    .order("created_at" as never);

  // Agrupa sets por exercício
  const setsPorExercicio: Record<string, typeof sets> = {};
  (sets ?? []).forEach((s) => {
    if (!setsPorExercicio[s.exercicio_id]) setsPorExercicio[s.exercicio_id] = [];
    setsPorExercicio[s.exercicio_id]!.push(s);
  });

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/treinos"
        className="inline-flex items-center gap-1 text-foreground/60 hover:text-foreground mb-4"
      >
        <ChevronLeft size={18} /> Voltar
      </Link>

      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          {format(new Date(sessao.data), "EEEE, dd MMM", { locale: ptBR })}
        </h1>
        <p className="text-foreground/60 mt-1">
          {sessao.duracao_min ? "Sessão finalizada" : "Em andamento"}
        </p>
      </div>

      {/* Form pra adicionar set */}
      <SessaoForm
        sessaoId={id}
        exercicios={exercicios ?? []}
        setsExistentes={sets ?? []}
      />

      {/* Sets registrados */}
      {Object.keys(setsPorExercicio).length > 0 && (
        <Card className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Sets registrados</h2>
          <div className="flex flex-col gap-4">
            {Object.entries(setsPorExercicio).map(([exId, exSets]) => {
              const nomeEx = (exSets?.[0] as never as {
                exercicios: { nome: string; grupo_muscular: string | null };
              })?.exercicios?.nome ?? "Exercício";
              return (
                <div key={exId}>
                  <div className="font-medium mb-2">{nomeEx}</div>
                  <div className="flex flex-col gap-1">
                    {(exSets ?? []).map((s) => (
                      <div
                        key={s.id}
                        className="flex items-center gap-3 text-sm py-1.5 px-3 bg-background rounded"
                      >
                        <span className="text-foreground/60 w-12">#{s.numero_set}</span>
                        <span className="flex-1">
                          {s.reps ?? "—"} reps
                          {s.carga ? ` × ${s.carga}kg` : ""}
                          {s.rpe ? ` · RPE ${s.rpe}` : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Finalizar sessão */}
      {!sessao.duracao_min && (sets?.length ?? 0) > 0 && (
        <Card className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Finalizar sessão</h2>
          <form action={finalizarSessao} className="flex flex-col gap-3">
            <input type="hidden" name="id" value={id} />
            <Input
              name="duracao_min"
              type="number"
              label="Duração (minutos)"
              placeholder="60"
            />
            <Input
              name="rpe"
              type="number"
              min={1}
              max={10}
              label="RPE geral (1-10)"
              placeholder="7"
            />
            <Textarea
              name="notas"
              label="Notas da sessão"
              placeholder="Como foi a sessão?"
              defaultValue={sessao.notas ?? ""}
            />
            <Button type="submit" className="self-start">
              Finalizar
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}
