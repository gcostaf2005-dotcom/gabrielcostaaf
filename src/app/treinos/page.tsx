import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { iniciarSessao } from "./actions";
import { Dumbbell, History, ListChecks, TrendingUp, Plus, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function TreinosPage() {
  const supabase = await createClient();

  const { data: sessoes } = await supabase
    .from("sessoes_treino")
    .select("*, sessao_sets(id)")
    .order("data", { ascending: false })
    .limit(5);

  const { count: totalExercicios } = await supabase
    .from("exercicios")
    .select("*", { count: "exact", head: true });

  return (
    <div className="space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Treinos</h1>
        <p className="text-sm text-muted mt-1">
          {totalExercicios} exercícios cadastrados
        </p>
      </header>

      {/* Ações rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <form action={iniciarSessao}>
          <button
            type="submit"
            className="w-full h-24 bg-primary hover:bg-primary/90 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all text-white active:scale-[0.98] shadow-sm shadow-primary/20"
          >
            <Plus size={22} strokeWidth={2.5} />
            <span className="font-semibold text-sm">Nova Sessão</span>
          </button>
        </form>

        <Link
          href="/treinos/historico"
          className="h-24 bg-card border border-border hover:border-border/100 hover:bg-card/80 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all"
        >
          <History size={22} className="text-muted" />
          <span className="font-medium text-sm">Histórico</span>
        </Link>

        <Link
          href="/treinos/exercicios"
          className="h-24 bg-card border border-border hover:border-border/100 hover:bg-card/80 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all"
        >
          <ListChecks size={22} className="text-muted" />
          <span className="font-medium text-sm">Exercícios</span>
        </Link>

        <Link
          href="/treinos/evolucao"
          className="h-24 bg-card border border-border hover:border-border/100 hover:bg-card/80 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all"
        >
          <TrendingUp size={22} className="text-muted" />
          <span className="font-medium text-sm">Evolução</span>
        </Link>
      </div>

      {/* Últimas sessões */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-foreground/80">Últimas sessões</h2>
          {sessoes && sessoes.length > 0 && (
            <Link
              href="/treinos/historico"
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              Ver tudo
            </Link>
          )}
        </div>

        {!sessoes || sessoes.length === 0 ? (
          <EmptyState
            icon={Dumbbell}
            title="Nenhuma sessão ainda"
            description="Clica em Nova Sessão pra registrar seu primeiro treino"
          />
        ) : (
          <div className="space-y-1">
            {sessoes.map((s) => {
              const totalSets = (s.sessao_sets as { id: string }[] | null)?.length ?? 0;
              return (
                <Link
                  key={s.id}
                  href={`/treinos/sessao/${s.id}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-card transition-colors -mx-1"
                >
                  <div>
                    <div className="font-medium text-sm capitalize">
                      {format(new Date(s.data), "EEEE, dd MMM", { locale: ptBR })}
                    </div>
                    <div className="text-xs text-muted mt-0.5">
                      {totalSets} sets
                      {s.duracao_min ? ` · ${s.duracao_min}min` : " · Em andamento"}
                      {s.rpe ? ` · RPE ${s.rpe}` : ""}
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-muted" />
                </Link>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
