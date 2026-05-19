import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { iniciarSessao } from "./actions";
import { Dumbbell, History, ListChecks, TrendingUp, Plus } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function TreinosPage() {
  const supabase = await createClient();

  const { data: sessoes } = await supabase
    .from("sessoes_treino")
    .select("*")
    .order("data", { ascending: false })
    .limit(5);

  const { count: totalExercicios } = await supabase
    .from("exercicios")
    .select("*", { count: "exact", head: true });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Treinos</h1>
          <p className="text-foreground/60 mt-1">
            {totalExercicios} exercícios cadastrados · {sessoes?.length ?? 0} sessões recentes
          </p>
        </div>
      </div>

      {/* Ações rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <form action={iniciarSessao}>
          <button
            type="submit"
            className="w-full p-4 bg-primary hover:bg-primary/90 rounded-xl flex flex-col items-center gap-2 transition-colors text-white"
          >
            <Plus size={28} />
            <span className="font-semibold text-sm md:text-base">Nova Sessão</span>
          </button>
        </form>

        <Link
          href="/treinos/historico"
          className="p-4 bg-card border border-border hover:bg-border/30 rounded-xl flex flex-col items-center gap-2 transition-colors"
        >
          <History size={28} />
          <span className="font-semibold text-sm md:text-base">Histórico</span>
        </Link>

        <Link
          href="/treinos/exercicios"
          className="p-4 bg-card border border-border hover:bg-border/30 rounded-xl flex flex-col items-center gap-2 transition-colors"
        >
          <ListChecks size={28} />
          <span className="font-semibold text-sm md:text-base">Exercícios</span>
        </Link>

        <Link
          href="/treinos/evolucao"
          className="p-4 bg-card border border-border hover:bg-border/30 rounded-xl flex flex-col items-center gap-2 transition-colors"
        >
          <TrendingUp size={28} />
          <span className="font-semibold text-sm md:text-base">Evolução</span>
        </Link>
      </div>

      {/* Últimas sessões */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Dumbbell size={20} />
            Últimas sessões
          </h2>
          {sessoes && sessoes.length > 0 && (
            <Link
              href="/treinos/historico"
              className="text-sm text-primary hover:underline"
            >
              Ver tudo
            </Link>
          )}
        </div>

        {!sessoes || sessoes.length === 0 ? (
          <div className="text-center py-8 text-foreground/60">
            <p>Nenhuma sessão registrada ainda.</p>
            <p className="text-sm mt-2">Clica em &ldquo;Nova Sessão&rdquo; pra começar.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {sessoes.map((s) => (
              <Link
                key={s.id}
                href={`/treinos/sessao/${s.id}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-border/30 transition-colors"
              >
                <div>
                  <div className="font-medium">
                    {format(new Date(s.data), "EEEE, dd MMM", { locale: ptBR })}
                  </div>
                  <div className="text-sm text-foreground/60 mt-0.5">
                    {s.duracao_min ? `${s.duracao_min}min` : "Em andamento"}
                    {s.rpe && ` · RPE ${s.rpe}`}
                  </div>
                </div>
                <Button variant="ghost" size="sm">Abrir</Button>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
