import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Calendar, ListTodo, Plus, MapPin, Clock } from "lucide-react";
import { format, startOfDay, endOfDay, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TarefaToggle } from "./TarefaToggle";

export default async function AgendaPage() {
  const supabase = await createClient();
  const hoje = startOfDay(new Date());
  const fim7Dias = endOfDay(addDays(hoje, 7));

  const { data: eventos } = await supabase
    .from("eventos")
    .select("*")
    .gte("data_inicio", hoje.toISOString())
    .lte("data_inicio", fim7Dias.toISOString())
    .order("data_inicio");

  const { data: tarefasPendentes } = await supabase
    .from("tarefas")
    .select("*")
    .eq("concluida", false)
    .order("prioridade", { ascending: false, nullsFirst: false })
    .order("data_vencimento", { nullsFirst: false });

  return (
    <div className="space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Agenda</h1>
        <p className="text-sm text-muted mt-1 capitalize">
          {format(hoje, "EEEE, dd 'de' MMM", { locale: ptBR })}
        </p>
      </header>

      {/* Ações */}
      <div className="grid grid-cols-3 gap-2.5">
        <Link
          href="/agenda/eventos"
          className="h-24 bg-primary hover:bg-primary/90 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all text-white active:scale-[0.98] shadow-sm shadow-primary/20"
        >
          <Plus size={22} strokeWidth={2.5} />
          <span className="font-semibold text-sm">Novo Evento</span>
        </Link>

        <Link
          href="/agenda/eventos"
          className="h-24 bg-card border border-border hover:border-border/100 hover:bg-card/80 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all"
        >
          <Calendar size={22} className="text-muted" />
          <span className="font-medium text-sm">Eventos</span>
        </Link>

        <Link
          href="/agenda/tarefas"
          className="h-24 bg-card border border-border hover:border-border/100 hover:bg-card/80 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all"
        >
          <ListTodo size={22} className="text-muted" />
          <span className="font-medium text-sm">Tarefas</span>
        </Link>
      </div>

      {/* Próximos eventos */}
      <Card>
        <h2 className="text-sm font-semibold text-foreground/80 mb-3">Próximos 7 dias</h2>
        {!eventos || eventos.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="Nenhum evento próximo"
            description="Toca em Novo Evento pra agendar"
          />
        ) : (
          <div className="space-y-2">
            {eventos.map((e) => (
              <div
                key={e.id}
                className="flex items-start gap-3 py-2.5 border-b border-border/40 last:border-0"
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
                  <div className="text-sm font-medium">{e.titulo}</div>
                  <div className="text-xs text-muted flex flex-wrap items-center gap-3 mt-1">
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
          <h2 className="text-sm font-semibold text-foreground/80">Tarefas pendentes</h2>
          {tarefasPendentes && tarefasPendentes.length > 0 && (
            <Link
              href="/agenda/tarefas"
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              Ver tudo
            </Link>
          )}
        </div>

        {!tarefasPendentes || tarefasPendentes.length === 0 ? (
          <EmptyState
            icon={ListTodo}
            title="Tudo em dia ✨"
            description="Sem tarefas pendentes no momento"
          />
        ) : (
          <div className="space-y-0.5">
            {tarefasPendentes.slice(0, 6).map((t) => (
              <TarefaToggle key={t.id} tarefa={t} />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
