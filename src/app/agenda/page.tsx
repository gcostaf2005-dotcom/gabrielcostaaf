import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Plus, CalendarPlus, ListPlus, ChevronLeft, ChevronRight, MapPin, CalendarClock } from "lucide-react";
import {
  format,
  eachDayOfInterval,
  isToday,
  isTomorrow,
  isSameDay,
  addDays,
  parseISO,
  startOfDay,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { TarefaToggle } from "./TarefaToggle";
import type { Evento, Tarefa } from "@/lib/supabase/types";

const JANELA = 14; // dias exibidos por vez

export default async function AgendaPage({
  searchParams,
}: {
  searchParams: Promise<{ inicio?: string }>;
}) {
  const { inicio: inicioParam } = await searchParams;
  const supabase = await createClient();

  const inicio = inicioParam ? startOfDay(parseISO(inicioParam)) : startOfDay(new Date());
  const fim = addDays(inicio, JANELA - 1);
  const dias = eachDayOfInterval({ start: inicio, end: fim });

  const ehVisaoHoje = isToday(inicio);

  // Eventos da janela
  const { data: eventosData } = await supabase
    .from("eventos")
    .select("*")
    .gte("data_inicio", inicio.toISOString())
    .lte("data_inicio", addDays(fim, 1).toISOString())
    .order("data_inicio");

  // Tarefas com vencimento na janela
  const { data: tarefasData } = await supabase
    .from("tarefas")
    .select("*")
    .not("data_vencimento", "is", null)
    .gte("data_vencimento", format(inicio, "yyyy-MM-dd"))
    .lte("data_vencimento", format(fim, "yyyy-MM-dd"))
    .order("data_vencimento");

  // Tarefas sem data (só na visão de hoje)
  const { data: tarefasSemData } = ehVisaoHoje
    ? await supabase
        .from("tarefas")
        .select("*")
        .is("data_vencimento", null)
        .eq("concluida", false)
        .order("prioridade", { ascending: false, nullsFirst: false })
    : { data: [] };

  const eventos = (eventosData ?? []) as Evento[];
  const tarefas = (tarefasData ?? []) as Tarefa[];
  const semData = (tarefasSemData ?? []) as Tarefa[];

  const labelDia = (d: Date) => {
    if (isToday(d)) return "Hoje";
    if (isTomorrow(d)) return "Amanhã";
    return format(d, "EEEE", { locale: ptBR });
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Agenda</h1>
          <p className="text-sm text-muted mt-1">
            {format(inicio, "dd MMM", { locale: ptBR })} —{" "}
            {format(fim, "dd MMM", { locale: ptBR })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/agenda/eventos"
            className="flex items-center gap-1.5 px-3 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium transition-all active:scale-[0.98]"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span className="hidden sm:inline">Criar</span>
          </Link>
        </div>
      </header>

      {/* Navegação de período */}
      <div className="flex items-center justify-between">
        <Link
          href={`/agenda?inicio=${format(addDays(inicio, -JANELA), "yyyy-MM-dd")}`}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-muted hover:text-foreground hover:bg-card rounded-lg transition-colors"
        >
          <ChevronLeft size={16} />
          Anterior
        </Link>

        {!ehVisaoHoje && (
          <Link
            href="/agenda"
            className="px-3 py-1.5 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors font-medium"
          >
            Hoje
          </Link>
        )}

        <Link
          href={`/agenda?inicio=${format(addDays(inicio, JANELA), "yyyy-MM-dd")}`}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-muted hover:text-foreground hover:bg-card rounded-lg transition-colors"
        >
          Próximo
          <ChevronRight size={16} />
        </Link>
      </div>

      {/* Atalhos de criação */}
      <div className="grid grid-cols-2 gap-2.5">
        <Link
          href="/agenda/eventos"
          className="flex items-center gap-2 p-3 bg-card border border-border hover:border-border/100 hover:bg-card/80 rounded-xl transition-all"
        >
          <CalendarPlus size={18} className="text-violet" />
          <span className="text-sm font-medium">Novo evento</span>
        </Link>
        <Link
          href="/agenda/tarefas"
          className="flex items-center gap-2 p-3 bg-card border border-border hover:border-border/100 hover:bg-card/80 rounded-xl transition-all"
        >
          <ListPlus size={18} className="text-warning" />
          <span className="text-sm font-medium">Nova tarefa</span>
        </Link>
      </div>

      {/* Tarefas sem data — só na visão de hoje */}
      {semData.length > 0 && (
        <Card className="!p-4 border-warning/20">
          <h2 className="text-xs uppercase tracking-wide text-warning font-semibold mb-2 flex items-center gap-1.5">
            <CalendarClock size={13} />
            Sem data definida
          </h2>
          <div className="space-y-0.5">
            {semData.map((t) => (
              <TarefaToggle key={t.id} tarefa={t} />
            ))}
          </div>
        </Card>
      )}

      {/* Timeline dia a dia */}
      <div className="space-y-3">
        {dias.map((dia) => {
          const eventosDia = eventos
            .filter((e) => isSameDay(parseISO(e.data_inicio), dia))
            .sort((a, b) => a.data_inicio.localeCompare(b.data_inicio));
          const tarefasDia = tarefas.filter(
            (t) => t.data_vencimento && isSameDay(parseISO(t.data_vencimento), dia)
          );
          const vazio = eventosDia.length === 0 && tarefasDia.length === 0;
          const hoje = isToday(dia);

          return (
            <div
              key={dia.toISOString()}
              className={`rounded-xl border transition-colors ${
                hoje
                  ? "border-primary/40 bg-primary/[0.04]"
                  : "border-border/60 bg-card/40"
              }`}
            >
              {/* Header do dia */}
              <div className="flex items-baseline gap-2 px-4 pt-3 pb-2">
                <span
                  className={`text-sm font-semibold capitalize ${
                    hoje ? "text-primary" : "text-foreground"
                  }`}
                >
                  {labelDia(dia)}
                </span>
                <span className="text-xs text-muted capitalize">
                  {format(dia, "dd 'de' MMM", { locale: ptBR })}
                </span>
              </div>

              {/* Conteúdo do dia */}
              <div className="px-2 pb-2">
                {vazio ? (
                  <p className="text-xs text-muted px-2 py-2">Sem compromissos</p>
                ) : (
                  <div className="space-y-0.5">
                    {/* Eventos */}
                    {eventosDia.map((e) => (
                      <div
                        key={e.id}
                        className="flex items-start gap-3 px-2 py-2 rounded-lg hover:bg-card transition-colors"
                      >
                        <div className="flex-shrink-0 w-12 text-xs text-muted tabular pt-0.5">
                          {e.dia_inteiro
                            ? "Dia"
                            : format(parseISO(e.data_inicio), "HH:mm")}
                        </div>
                        <div className="w-1 self-stretch rounded-full bg-violet flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium">{e.titulo}</div>
                          {(e.local || e.descricao) && (
                            <div className="text-xs text-muted mt-0.5 flex items-center gap-2">
                              {e.local && (
                                <span className="flex items-center gap-1">
                                  <MapPin size={11} />
                                  {e.local}
                                </span>
                              )}
                              {e.descricao && <span className="truncate">{e.descricao}</span>}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Tarefas */}
                    {tarefasDia.map((t) => (
                      <div key={t.id} className="flex items-start gap-3 px-2">
                        <div className="flex-shrink-0 w-12" />
                        <div className="w-1 self-stretch rounded-full bg-warning flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <TarefaToggle tarefa={t} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
