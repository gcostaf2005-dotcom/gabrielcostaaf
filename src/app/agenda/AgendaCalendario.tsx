"use client";

import { useState } from "react";
import Link from "next/link";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  isToday,
  addMonths,
  addDays,
  addWeeks,
  parseISO,
  startOfDay,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  MapPin,
  CalendarPlus,
  ListPlus,
  Film,
  Smartphone,
} from "lucide-react";
import { TarefaToggle } from "./TarefaToggle";
import { rotinaDoDia, META_STORIES } from "@/lib/rotinaConteudo";
import type { Evento, Tarefa } from "@/lib/supabase/types";

const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const HORAS = Array.from({ length: 18 }, (_, i) => i + 6); // 06h - 23h

type View = "mes" | "semana" | "dia";

interface Props {
  eventos: Evento[];
  tarefas: Tarefa[];
}

export function AgendaCalendario({ eventos, tarefas }: Props) {
  const [view, setView] = useState<View>("mes");
  const [dataRef, setDataRef] = useState<Date>(() => new Date());
  const [diaSelecionado, setDiaSelecionado] = useState<Date>(() => new Date());

  // Helpers
  const eventosDoDia = (dia: Date) =>
    eventos
      .filter((e) => isSameDay(parseISO(e.data_inicio), dia))
      .sort((a, b) => a.data_inicio.localeCompare(b.data_inicio));

  const tarefasDoDia = (dia: Date) =>
    tarefas.filter(
      (t) => t.data_vencimento && isSameDay(parseISO(t.data_vencimento), dia)
    );

  // Navegação contextual
  const navegar = (delta: number) => {
    if (view === "mes") setDataRef(addMonths(dataRef, delta));
    else if (view === "semana") setDataRef(addWeeks(dataRef, delta));
    else setDataRef(addDays(dataRef, delta));
  };

  const irHoje = () => {
    const hoje = new Date();
    setDataRef(hoje);
    setDiaSelecionado(hoje);
  };

  const tituloAtual = () => {
    if (view === "mes") return format(dataRef, "MMMM 'de' yyyy", { locale: ptBR });
    if (view === "semana") {
      const inicio = startOfWeek(dataRef, { weekStartsOn: 0 });
      const fim = endOfWeek(dataRef, { weekStartsOn: 0 });
      return `${format(inicio, "dd MMM", { locale: ptBR })} – ${format(fim, "dd MMM", { locale: ptBR })}`;
    }
    return format(dataRef, "EEEE, dd 'de' MMM", { locale: ptBR });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Agenda</h1>
        <Link
          href="/agenda/eventos"
          className="flex items-center gap-1.5 px-3 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium transition-all active:scale-[0.98]"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span className="hidden sm:inline">Criar</span>
        </Link>
      </header>

      {/* Barra de controle */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        {/* Navegação */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => navegar(-1)}
            className="p-2 text-muted hover:text-foreground hover:bg-card rounded-lg transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={irHoje}
            className="px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
          >
            Hoje
          </button>
          <button
            onClick={() => navegar(1)}
            className="p-2 text-muted hover:text-foreground hover:bg-card rounded-lg transition-colors"
            aria-label="Próximo"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Título */}
        <div className="flex-1 capitalize text-base font-semibold tracking-tight">
          {tituloAtual()}
        </div>

        {/* Toggle de view */}
        <div className="inline-flex bg-card border border-border rounded-lg p-0.5 self-start sm:self-auto">
          {(["mes", "semana", "dia"] as View[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors capitalize ${
                view === v
                  ? "bg-primary text-white"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {v === "mes" ? "Mês" : v}
            </button>
          ))}
        </div>
      </div>

      {/* View atual */}
      {view === "mes" && (
        <ViewMes
          dataRef={dataRef}
          diaSelecionado={diaSelecionado}
          setDiaSelecionado={setDiaSelecionado}
          eventosDoDia={eventosDoDia}
          tarefasDoDia={tarefasDoDia}
        />
      )}
      {view === "semana" && (
        <ViewSemana
          dataRef={dataRef}
          eventosDoDia={eventosDoDia}
          tarefasDoDia={tarefasDoDia}
          onDiaClick={(d) => {
            setDiaSelecionado(d);
            setView("dia");
            setDataRef(d);
          }}
        />
      )}
      {view === "dia" && (
        <ViewDia
          dataRef={dataRef}
          eventos={eventosDoDia(dataRef)}
          tarefas={tarefasDoDia(dataRef)}
        />
      )}

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

      {/* Painel do dia selecionado (só na vista mês) */}
      {view === "mes" && (
        <PainelDoDia
          dia={diaSelecionado}
          eventos={eventosDoDia(diaSelecionado)}
          tarefas={tarefasDoDia(diaSelecionado)}
        />
      )}
    </div>
  );
}

// ====== View MÊS ======
function ViewMes({
  dataRef,
  diaSelecionado,
  setDiaSelecionado,
  eventosDoDia,
  tarefasDoDia,
}: {
  dataRef: Date;
  diaSelecionado: Date;
  setDiaSelecionado: (d: Date) => void;
  eventosDoDia: (d: Date) => Evento[];
  tarefasDoDia: (d: Date) => Tarefa[];
}) {
  const inicioGrade = startOfWeek(startOfMonth(dataRef), { weekStartsOn: 0 });
  const fimGrade = endOfWeek(endOfMonth(dataRef), { weekStartsOn: 0 });
  const dias = eachDayOfInterval({ start: inicioGrade, end: fimGrade });

  return (
    <div className="bg-card/40 border border-border/60 rounded-2xl p-2 md:p-3">
      <div className="grid grid-cols-7 mb-1">
        {DIAS_SEMANA.map((d) => (
          <div
            key={d}
            className="text-center text-[11px] font-medium text-muted py-1.5 uppercase tracking-wide"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {dias.map((dia) => {
          const evs = eventosDoDia(dia);
          const tfs = tarefasDoDia(dia);
          const totalItens = evs.length + tfs.length;
          const doMes = isSameMonth(dia, dataRef);
          const hoje = isToday(dia);
          const selecionado = isSameDay(dia, diaSelecionado);

          return (
            <button
              key={dia.toISOString()}
              onClick={() => setDiaSelecionado(dia)}
              className={`min-h-[60px] md:min-h-[88px] rounded-lg p-1.5 flex flex-col gap-1 text-left transition-all border ${
                selecionado
                  ? "border-primary bg-primary/[0.07]"
                  : "border-transparent hover:bg-card"
              } ${doMes ? "" : "opacity-35"}`}
            >
              <div className="flex justify-center md:justify-start">
                <span
                  className={`text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full ${
                    hoje ? "bg-primary text-white" : "text-foreground"
                  }`}
                >
                  {format(dia, "d")}
                </span>
              </div>

              <div className="hidden md:flex flex-col gap-0.5 overflow-hidden">
                {evs.slice(0, 2).map((e) => (
                  <div
                    key={e.id}
                    className="text-[10px] leading-tight px-1 py-0.5 rounded bg-violet/20 text-violet truncate"
                  >
                    {!e.dia_inteiro && format(parseISO(e.data_inicio), "HH:mm") + " "}
                    {e.titulo}
                  </div>
                ))}
                {tfs.slice(0, 2 - Math.min(evs.length, 2)).map((t) => (
                  <div
                    key={t.id}
                    className={`text-[10px] leading-tight px-1 py-0.5 rounded bg-warning/20 text-warning truncate ${
                      t.concluida ? "line-through opacity-60" : ""
                    }`}
                  >
                    {t.titulo}
                  </div>
                ))}
                {totalItens > 2 && (
                  <div className="text-[10px] text-muted px-1">+{totalItens - 2}</div>
                )}
              </div>

              {totalItens > 0 && (
                <div className="flex md:hidden justify-center gap-0.5 mt-auto">
                  {evs.length > 0 && <span className="w-1.5 h-1.5 rounded-full bg-violet" />}
                  {tfs.length > 0 && <span className="w-1.5 h-1.5 rounded-full bg-warning" />}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ====== View SEMANA ======
function ViewSemana({
  dataRef,
  eventosDoDia,
  tarefasDoDia,
  onDiaClick,
}: {
  dataRef: Date;
  eventosDoDia: (d: Date) => Evento[];
  tarefasDoDia: (d: Date) => Tarefa[];
  onDiaClick: (d: Date) => void;
}) {
  const inicio = startOfWeek(dataRef, { weekStartsOn: 0 });
  const dias = eachDayOfInterval({ start: inicio, end: endOfWeek(dataRef, { weekStartsOn: 0 }) });

  // Posição vertical de um evento no grid de horas
  const posEvento = (e: Evento) => {
    const d = parseISO(e.data_inicio);
    const h = d.getHours();
    const m = d.getMinutes();
    const inicioMin = (h - 6) * 60 + m;
    const fimMin = e.data_fim
      ? (() => {
          const df = parseISO(e.data_fim);
          return (df.getHours() - 6) * 60 + df.getMinutes();
        })()
      : inicioMin + 60;
    const altura = Math.max(fimMin - inicioMin, 30);
    const topo = (inicioMin / 60) * 48; // 48px por hora
    return { top: topo, height: (altura / 60) * 48 };
  };

  return (
    <div className="bg-card/40 border border-border/60 rounded-2xl overflow-hidden">
      {/* Header dias */}
      <div className="grid grid-cols-[48px_repeat(7,1fr)] border-b border-border/60">
        <div />
        {dias.map((dia) => {
          const hoje = isToday(dia);
          return (
            <button
              key={dia.toISOString()}
              onClick={() => onDiaClick(dia)}
              className="flex flex-col items-center py-2 hover:bg-card transition-colors"
            >
              <span className="text-[10px] uppercase tracking-wide text-muted">
                {format(dia, "EEE", { locale: ptBR })}
              </span>
              <span
                className={`text-base font-semibold mt-0.5 w-8 h-8 flex items-center justify-center rounded-full ${
                  hoje ? "bg-primary text-white" : ""
                }`}
              >
                {format(dia, "d")}
              </span>
            </button>
          );
        })}
      </div>

      {/* All-day / dia-inteiro + tarefas */}
      <div className="grid grid-cols-[48px_repeat(7,1fr)] border-b border-border/60 text-xs">
        <div className="text-[10px] text-muted py-1.5 pr-2 text-right">dia</div>
        {dias.map((dia) => {
          const evs = eventosDoDia(dia).filter((e) => e.dia_inteiro);
          const tfs = tarefasDoDia(dia);
          return (
            <div key={dia.toISOString()} className="border-l border-border/40 p-1 space-y-0.5 min-h-[28px]">
              {evs.map((e) => (
                <div
                  key={e.id}
                  className="text-[10px] px-1 py-0.5 rounded bg-violet/20 text-violet truncate"
                >
                  {e.titulo}
                </div>
              ))}
              {tfs.map((t) => (
                <div
                  key={t.id}
                  className={`text-[10px] px-1 py-0.5 rounded bg-warning/20 text-warning truncate ${
                    t.concluida ? "line-through opacity-60" : ""
                  }`}
                >
                  {t.titulo}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Régua de horas + grid */}
      <div className="relative max-h-[600px] overflow-y-auto">
        <div className="grid grid-cols-[48px_repeat(7,1fr)]">
          {/* Coluna de horas */}
          <div>
            {HORAS.map((h) => (
              <div
                key={h}
                className="h-12 text-[10px] text-muted text-right pr-2 pt-0 border-b border-border/30 tabular"
              >
                {String(h).padStart(2, "0")}:00
              </div>
            ))}
          </div>
          {/* Colunas dos dias */}
          {dias.map((dia) => {
            const evs = eventosDoDia(dia).filter((e) => !e.dia_inteiro);
            return (
              <div key={dia.toISOString()} className="relative border-l border-border/40">
                {HORAS.map((h) => (
                  <div key={h} className="h-12 border-b border-border/30" />
                ))}
                {evs.map((e) => {
                  const { top, height } = posEvento(e);
                  return (
                    <div
                      key={e.id}
                      className="absolute left-0.5 right-0.5 rounded bg-violet/30 border-l-2 border-violet text-[10px] p-1 overflow-hidden"
                      style={{ top: `${top}px`, height: `${height}px` }}
                    >
                      <div className="font-semibold text-violet truncate">{e.titulo}</div>
                      <div className="text-foreground/70 truncate">
                        {format(parseISO(e.data_inicio), "HH:mm")}
                        {e.local && ` · ${e.local}`}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ====== View DIA ======
function ViewDia({
  dataRef,
  eventos,
  tarefas,
}: {
  dataRef: Date;
  eventos: Evento[];
  tarefas: Tarefa[];
}) {
  const posEvento = (e: Evento) => {
    const d = parseISO(e.data_inicio);
    const h = d.getHours();
    const m = d.getMinutes();
    const inicioMin = (h - 6) * 60 + m;
    const fimMin = e.data_fim
      ? (() => {
          const df = parseISO(e.data_fim);
          return (df.getHours() - 6) * 60 + df.getMinutes();
        })()
      : inicioMin + 60;
    const altura = Math.max(fimMin - inicioMin, 30);
    const topo = (inicioMin / 60) * 60; // 60px por hora na view dia
    return { top: topo, height: (altura / 60) * 60 };
  };

  const evsTimed = eventos.filter((e) => !e.dia_inteiro);
  const evsAllday = eventos.filter((e) => e.dia_inteiro);

  return (
    <div className="bg-card/40 border border-border/60 rounded-2xl overflow-hidden">
      {/* All-day + tarefas */}
      {(evsAllday.length > 0 || tarefas.length > 0) && (
        <div className="border-b border-border/60 p-3 space-y-1">
          <p className="text-[10px] uppercase tracking-wide text-muted mb-1">Dia inteiro / Tarefas</p>
          {evsAllday.map((e) => (
            <div
              key={e.id}
              className="text-sm px-2 py-1.5 rounded bg-violet/20 text-violet"
            >
              {e.titulo}
            </div>
          ))}
          {tarefas.map((t) => (
            <div key={t.id} className="px-2">
              <TarefaToggle tarefa={t} />
            </div>
          ))}
        </div>
      )}

      {/* Régua de horas */}
      <div className="relative max-h-[600px] overflow-y-auto">
        <div className="grid grid-cols-[64px_1fr]">
          <div>
            {HORAS.map((h) => (
              <div
                key={h}
                className="h-[60px] text-xs text-muted text-right pr-3 pt-0 border-b border-border/30 tabular"
              >
                {String(h).padStart(2, "0")}:00
              </div>
            ))}
          </div>
          <div className="relative border-l border-border/40">
            {HORAS.map((h) => (
              <div key={h} className="h-[60px] border-b border-border/30" />
            ))}
            {evsTimed.map((e) => {
              const { top, height } = posEvento(e);
              return (
                <div
                  key={e.id}
                  className="absolute left-1 right-1 rounded-lg bg-violet/30 border-l-2 border-violet p-2"
                  style={{ top: `${top}px`, height: `${height}px` }}
                >
                  <div className="text-sm font-semibold text-violet">{e.titulo}</div>
                  <div className="text-xs text-foreground/70 flex items-center gap-2 mt-0.5">
                    <span>
                      {format(parseISO(e.data_inicio), "HH:mm")}
                      {e.data_fim && ` – ${format(parseISO(e.data_fim), "HH:mm")}`}
                    </span>
                    {e.local && (
                      <span className="flex items-center gap-1">
                        <MapPin size={11} />
                        {e.local}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ====== Painel do Dia (na vista MÊS) ======
function PainelDoDia({
  dia,
  eventos,
  tarefas,
}: {
  dia: Date;
  eventos: Evento[];
  tarefas: Tarefa[];
}) {
  const rotina = rotinaDoDia(dia.getDay());

  return (
    <div className="bg-card/40 border border-border/60 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold capitalize">
          {isToday(dia) ? "Hoje" : format(dia, "EEEE", { locale: ptBR })}
          <span className="text-muted font-normal ml-2 text-sm">
            {format(dia, "dd 'de' MMMM", { locale: ptBR })}
          </span>
        </h3>
      </div>

      {eventos.length === 0 && tarefas.length === 0 ? (
        <p className="text-sm text-muted py-6 text-center">Nenhum compromisso neste dia</p>
      ) : (
        <div className="space-y-1">
          {eventos.map((e) => (
            <div
              key={e.id}
              className="flex items-start gap-3 px-2 py-2.5 rounded-lg hover:bg-card transition-colors"
            >
              <div className="flex-shrink-0 w-12 text-xs text-muted tabular pt-0.5">
                {e.dia_inteiro ? "Dia" : format(parseISO(e.data_inicio), "HH:mm")}
              </div>
              <div className="w-1 self-stretch rounded-full bg-violet flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{e.titulo}</div>
                {(e.local || e.descricao) && (
                  <div className="text-xs text-muted mt-0.5 flex items-center gap-2 flex-wrap">
                    {e.local && (
                      <span className="flex items-center gap-1">
                        <MapPin size={11} />
                        {e.local}
                      </span>
                    )}
                    {e.descricao && <span>{e.descricao}</span>}
                  </div>
                )}
              </div>
            </div>
          ))}

          {tarefas.map((t) => (
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

      {/* Rotina de conteúdo */}
      {rotina && (
        <div className="mt-4 pt-4 border-t border-border/40">
          <h4 className="text-xs uppercase tracking-wide text-muted font-semibold mb-3">
            Conteúdo do dia
          </h4>
          <div className="space-y-2">
            {rotina.reel ? (
              <div className="flex items-center gap-2.5 p-2.5 bg-violet/10 rounded-lg">
                <Film size={16} className="text-violet flex-shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-wide text-violet font-semibold">
                    Reel
                  </span>
                  <p className="text-sm font-medium">{rotina.reel}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2.5 p-2.5 bg-card rounded-lg">
                <Film size={16} className="text-muted flex-shrink-0" />
                <p className="text-sm text-muted">Sem reel — dia mais leve</p>
              </div>
            )}
            <div className="flex items-start gap-2.5 p-2.5 bg-primary/10 rounded-lg">
              <Smartphone size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-wide text-primary font-semibold">
                  Stories
                </span>
                <p className="text-sm">{rotina.stories.join(" · ")}</p>
                <p className="text-[11px] text-muted mt-0.5">{META_STORIES}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
