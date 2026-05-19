import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { TarefaToggle } from "./agenda/TarefaToggle";
import {
  Dumbbell,
  Wallet,
  Calendar,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Clock,
  ListTodo,
  MapPin,
} from "lucide-react";
import { format, startOfDay, endOfDay, addDays, startOfMonth, endOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";

function getSaudacao() {
  const h = new Date().getHours();
  if (h < 5) return "Boa madrugada";
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}

export default async function Home() {
  const supabase = await createClient();
  const hoje = new Date();

  // Finanças do mês
  const inicioMes = startOfMonth(hoje).toISOString().slice(0, 10);
  const fimMes = endOfMonth(hoje).toISOString().slice(0, 10);

  const { data: lancamentosMes } = await supabase
    .from("lancamentos")
    .select("tipo, valor")
    .gte("data", inicioMes)
    .lte("data", fimMes);

  type LancRow = { tipo: "entrada" | "saida"; valor: number };
  const rowsLanc = (lancamentosMes ?? []) as LancRow[];
  const entrada = rowsLanc.filter((l) => l.tipo === "entrada").reduce((a, l) => a + Number(l.valor), 0);
  const saida = rowsLanc.filter((l) => l.tipo === "saida").reduce((a, l) => a + Number(l.valor), 0);
  const saldo = entrada - saida;

  // Próximos eventos (7 dias)
  const inicio = startOfDay(hoje).toISOString();
  const fim7 = endOfDay(addDays(hoje, 7)).toISOString();
  const { data: eventos } = await supabase
    .from("eventos")
    .select("*")
    .gte("data_inicio", inicio)
    .lte("data_inicio", fim7)
    .order("data_inicio")
    .limit(3);

  // Tarefas pendentes
  const { data: tarefas } = await supabase
    .from("tarefas")
    .select("*")
    .eq("concluida", false)
    .order("prioridade", { ascending: false, nullsFirst: false })
    .order("data_vencimento", { nullsFirst: false })
    .limit(5);

  // Última sessão de treino
  const { data: ultimasSessoes } = await supabase
    .from("sessoes_treino")
    .select("*, sessao_sets(id)")
    .order("data", { ascending: false })
    .limit(1);

  const ultimaSessao = ultimasSessoes?.[0];
  const totalSetsUltima = (ultimaSessao?.sessao_sets as { id: string }[] | null)?.length ?? 0;

  // Sessões esse mês
  const { count: sessoesMes } = await supabase
    .from("sessoes_treino")
    .select("*", { count: "exact", head: true })
    .gte("data", inicioMes);

  return (
    <div className="space-y-6">
      {/* Saudação */}
      <header className="pb-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          {getSaudacao()}, Gabriel
        </h1>
        <p className="text-sm text-muted mt-1 capitalize">
          {format(hoje, "EEEE, dd 'de' MMMM", { locale: ptBR })}
        </p>
      </header>

      {/* Linha 1: Resumo financeiro + Treino */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card Finanças */}
        <Link href="/financas" className="group">
          <Card className="hover:border-border/100 hover:bg-card/80 transition-all h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center">
                  <Wallet size={18} className="text-success" />
                </div>
                <div>
                  <p className="text-xs text-muted">Saldo do mês</p>
                  <p
                    className={`text-2xl font-semibold tabular tracking-tight ${
                      saldo >= 0 ? "text-foreground" : "text-danger"
                    }`}
                  >
                    R$ {saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
              <ArrowRight
                size={18}
                className="text-muted opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-muted">
                <TrendingUp size={14} className="text-success" />
                <span className="tabular">
                  R$ {entrada.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </span>
              <span className="flex items-center gap-1.5 text-muted">
                <TrendingDown size={14} className="text-danger" />
                <span className="tabular">
                  R$ {saida.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </span>
            </div>
          </Card>
        </Link>

        {/* Card Treinos */}
        <Link href="/treinos" className="group">
          <Card className="hover:border-border/100 hover:bg-card/80 transition-all h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Dumbbell size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted">Sessões este mês</p>
                  <p className="text-2xl font-semibold tabular tracking-tight">
                    {sessoesMes ?? 0}
                  </p>
                </div>
              </div>
              <ArrowRight
                size={18}
                className="text-muted opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="text-sm text-muted">
              {ultimaSessao ? (
                <>
                  Última:{" "}
                  <span className="text-foreground/80">
                    {format(new Date(ultimaSessao.data), "dd 'de' MMM", { locale: ptBR })}
                  </span>
                  {" · "}
                  <span className="text-foreground/80">{totalSetsUltima} sets</span>
                </>
              ) : (
                <>Nenhuma sessão ainda</>
              )}
            </div>
          </Card>
        </Link>
      </div>

      {/* Linha 2: Agenda */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Próximos eventos */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
              <Calendar size={15} className="text-violet" />
              Próximos dias
            </h2>
            <Link
              href="/agenda/eventos"
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              Ver tudo
            </Link>
          </div>
          {!eventos || eventos.length === 0 ? (
            <p className="text-sm text-muted py-4 text-center">Sem eventos.</p>
          ) : (
            <div className="space-y-2">
              {eventos.map((e) => (
                <div
                  key={e.id}
                  className="flex items-start gap-3 py-2 border-b border-border/40 last:border-0"
                >
                  <div className="flex-shrink-0 w-11 text-center">
                    <div className="text-[10px] text-muted uppercase tracking-wide">
                      {format(new Date(e.data_inicio), "MMM", { locale: ptBR })}
                    </div>
                    <div className="text-lg font-semibold tabular">
                      {format(new Date(e.data_inicio), "dd")}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="text-sm font-medium truncate">{e.titulo}</div>
                    <div className="text-xs text-muted flex items-center gap-2 mt-0.5">
                      {!e.dia_inteiro && (
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {format(new Date(e.data_inicio), "HH:mm")}
                        </span>
                      )}
                      {e.local && (
                        <span className="flex items-center gap-1 truncate">
                          <MapPin size={11} />
                          {e.local}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Tarefas */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
              <ListTodo size={15} className="text-warning" />
              Tarefas pendentes
            </h2>
            <Link
              href="/agenda/tarefas"
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              Ver tudo
            </Link>
          </div>
          {!tarefas || tarefas.length === 0 ? (
            <p className="text-sm text-muted py-4 text-center">Tudo em dia ✨</p>
          ) : (
            <div className="space-y-0.5">
              {tarefas.map((t) => (
                <TarefaToggle key={t.id} tarefa={t} />
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
