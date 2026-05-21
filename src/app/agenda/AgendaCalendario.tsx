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
  parseISO,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  CalendarPlus,
  ListPlus,
} from "lucide-react";
import { TarefaToggle } from "./TarefaToggle";
import type { Evento, Tarefa } from "@/lib/supabase/types";

const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

interface Props {
  eventos: Evento[];
  tarefas: Tarefa[];
}

export function AgendaCalendario({ eventos, tarefas }: Props) {
  const [mesAtual, setMesAtual] = useState(() => startOfMonth(new Date()));
  const [diaSelecionado, setDiaSelecionado] = useState(() => new Date());

  const inicioGrade = startOfWeek(startOfMonth(mesAtual), { weekStartsOn: 0 });
  const fimGrade = endOfWeek(endOfMonth(mesAtual), { weekStartsOn: 0 });
  const dias = eachDayOfInterval({ start: inicioGrade, end: fimGrade });

  const eventosDoDia = (dia: Date) =>
    eventos
      .filter((e) => isSameDay(parseISO(e.data_inicio), dia))
      .sort((a, b) => a.data_inicio.localeCompare(b.data_inicio));

  const tarefasDoDia = (dia: Date) =>
    tarefas.filter(
      (t) => t.data_vencimento && isSameDay(parseISO(t.data_vencimento), dia)
    );

  const eventosSel = eventosDoDia(diaSelecionado);
  const tarefasSel = tarefasDoDia(diaSelecionado);

  return (
    <div className="space-y-5">
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

      {/* Navegação de mês */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setMesAtual(addMonths(mesAtual, -1))}
          className="p-2 text-muted hover:text-foreground hover:bg-card rounded-lg transition-colors"
          aria-label="Mês anterior"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-semibold capitalize tracking-tight">
          {format(mesAtual, "MMMM 'de' yyyy", { locale: ptBR })}
        </h2>
        <button
          onClick={() => setMesAtual(addMonths(mesAtual, 1))}
          className="p-2 text-muted hover:text-foreground hover:bg-card rounded-lg transition-colors"
          aria-label="Próximo mês"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Grade do calendário */}
      <div className="bg-card/40 border border-border/60 rounded-2xl p-2 md:p-3">
        {/* Cabeçalho dias da semana */}
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

        {/* Células dos dias */}
        <div className="grid grid-cols-7 gap-1">
          {dias.map((dia) => {
            const evs = eventosDoDia(dia);
            const tfs = tarefasDoDia(dia);
            const totalItens = evs.length + tfs.length;
            const doMes = isSameMonth(dia, mesAtual);
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
                {/* Número do dia */}
                <div className="flex justify-center md:justify-start">
                  <span
                    className={`text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full ${
                      hoje ? "bg-primary text-white" : "text-foreground"
                    }`}
                  >
                    {format(dia, "d")}
                  </span>
                </div>

                {/* Pílulas (desktop) */}
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
                    <div className="text-[10px] text-muted px-1">
                      +{totalItens - 2}
                    </div>
                  )}
                </div>

                {/* Pontinhos (mobile) */}
                {totalItens > 0 && (
                  <div className="flex md:hidden justify-center gap-0.5 mt-auto">
                    {evs.length > 0 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-violet" />
                    )}
                    {tfs.length > 0 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-warning" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
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

      {/* Painel do dia selecionado */}
      <div className="bg-card/40 border border-border/60 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold capitalize">
            {isToday(diaSelecionado)
              ? "Hoje"
              : format(diaSelecionado, "EEEE", { locale: ptBR })}
            <span className="text-muted font-normal ml-2 text-sm">
              {format(diaSelecionado, "dd 'de' MMMM", { locale: ptBR })}
            </span>
          </h3>
        </div>

        {eventosSel.length === 0 && tarefasSel.length === 0 ? (
          <p className="text-sm text-muted py-6 text-center">
            Nenhum compromisso neste dia
          </p>
        ) : (
          <div className="space-y-1">
            {eventosSel.map((e) => (
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

            {tarefasSel.map((t) => (
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

      {/* Legenda */}
      <div className="flex items-center justify-center gap-4 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-violet" />
          Eventos
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-warning" />
          Tarefas
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={11} />
          Toque num dia pra ver detalhes
        </span>
      </div>
    </div>
  );
}
