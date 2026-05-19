import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { ChevronLeft, TrendingUp } from "lucide-react";
import type { Exercicio } from "@/lib/supabase/types";

export default async function EvolucaoListaPage() {
  const supabase = await createClient();
  const { data: exercicios } = await supabase
    .from("exercicios")
    .select("*")
    .order("grupo_muscular")
    .order("nome");

  const grupos: Record<string, Exercicio[]> = {};
  (exercicios ?? []).forEach((e) => {
    const g = e.grupo_muscular || "outro";
    if (!grupos[g]) grupos[g] = [];
    grupos[g].push(e);
  });

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/treinos"
        className="inline-flex items-center gap-1 text-foreground/60 hover:text-foreground mb-4"
      >
        <ChevronLeft size={18} /> Voltar
      </Link>

      <h1 className="text-3xl font-bold mb-2">Evolução</h1>
      <p className="text-foreground/60 mb-6">
        Escolhe um exercício pra ver o gráfico de progresso
      </p>

      {Object.entries(grupos).map(([grupo, lista]) => (
        <Card key={grupo} className="mb-4">
          <h3 className="text-lg font-semibold capitalize mb-3">{grupo}</h3>
          <div className="flex flex-col gap-1">
            {lista.map((e) => (
              <Link
                key={e.id}
                href={`/treinos/evolucao/${e.id}`}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-border/30 transition-colors"
              >
                <span>{e.nome}</span>
                <TrendingUp size={16} className="text-foreground/40" />
              </Link>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
