"use client";

import { useState, useEffect } from "react";
import {
  ROTINA_SEMANA,
  ROTINA_FIM_SEMANA,
  rotinaDoDiaSemana,
  blocoAtual,
  CATEGORIA_COR,
  CATEGORIA_LABEL,
  type BlocoDia,
} from "@/lib/rotinaDiaria";
import { Card } from "@/components/ui/Card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const DIAS_LABELS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export function RotinaView() {
  const [agora, setAgora] = useState<Date>(() => new Date());
  const [diaSel, setDiaSel] = useState<number>(() => new Date().getDay());

  useEffect(() => {
    const tick = setInterval(() => setAgora(new Date()), 30000); // atualiza a cada 30s
    return () => clearInterval(tick);
  }, []);

  const ehHoje = diaSel === agora.getDay();
  const blocos = rotinaDoDiaSemana(diaSel);
  const atual = ehHoje ? blocoAtual(agora, blocos) : undefined;
  const horaAtual = format(agora, "HH:mm");

  // Tempo até dormir hoje
  const blocoSono = blocos.find((b) => b.categoria === "sono");
  const tempoAteDormir = (() => {
    if (!blocoSono || !ehHoje) return null;
    const [hSono, mSono] = blocoSono.inicio.split(":").map(Number);
    const alvo = new Date(agora);
    alvo.setHours(hSono, mSono, 0, 0);
    if (alvo < agora) alvo.setDate(alvo.getDate() + 1);
    const diffMs = alvo.getTime() - agora.getTime();
    const h = Math.floor(diffMs / 3600000);
    const m = Math.floor((diffMs % 3600000) / 60000);
    return `${h}h${m.toString().padStart(2, "0")}`;
  })();

  return (
    <div className="space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Rotina</h1>
        <p className="text-sm text-muted mt-1 italic">
          &ldquo;A vida é feita de constantes desequilíbrios.&rdquo;
        </p>
      </header>

      {/* Card: agora */}
      {ehHoje && atual && (
        <Card
          className="border-2"
          // @ts-expect-error inline style override
          style={{ borderColor: CATEGORIA_COR[atual.categoria] + "60" }}
        >
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-xs uppercase tracking-wide text-muted font-semibold">
              Agora · {horaAtual}
            </span>
            <span
              className="text-[10px] uppercase tracking-wide font-semibold px-2 py-0.5 rounded"
              style={{
                backgroundColor: CATEGORIA_COR[atual.categoria] + "20",
                color: CATEGORIA_COR[atual.categoria],
              }}
            >
              {CATEGORIA_LABEL[atual.categoria]}
            </span>
          </div>
          <h2 className="text-xl font-semibold tracking-tight mb-1">{atual.titulo}</h2>
          <p className="text-xs text-muted tabular">
            {atual.inicio} – {atual.fim}
          </p>
          <p className="text-sm mt-3 italic text-foreground/80">
            &ldquo;{atual.principio}&rdquo;
            <span className="not-italic text-muted">  — {atual.conselheiro}</span>
          </p>
          {atual.detalhes && (
            <p className="text-sm text-foreground/70 mt-3 pt-3 border-t border-border/40">
              {atual.detalhes}
            </p>
          )}
        </Card>
      )}

      {/* Tempo até dormir */}
      {tempoAteDormir && (
        <div className="text-center text-xs text-muted">
          Faltam <span className="tabular text-foreground/80 font-semibold">{tempoAteDormir}</span>{" "}
          até hora de dormir
        </div>
      )}

      {/* Seletor de dia */}
      <div className="grid grid-cols-7 gap-1">
        {DIAS_LABELS.map((d, i) => {
          const ativo = i === diaSel;
          const hoje = i === agora.getDay();
          return (
            <button
              key={i}
              onClick={() => setDiaSel(i)}
              className={`py-2 rounded-lg text-xs font-medium transition-colors ${
                ativo
                  ? "bg-primary text-white"
                  : hoje
                  ? "bg-card border border-primary/40 text-foreground"
                  : "bg-card text-muted hover:text-foreground"
              }`}
            >
              {d}
            </button>
          );
        })}
      </div>

      {/* Timeline do dia */}
      <div className="space-y-1.5">
        {blocos.map((b, i) => {
          const ehAtual = ehHoje && atual && b.inicio === atual.inicio;
          const cor = CATEGORIA_COR[b.categoria];
          return (
            <Card
              key={i}
              className={`!p-0 overflow-hidden transition-all ${
                ehAtual ? "border-primary/60 bg-primary/[0.04]" : ""
              }`}
            >
              <div className="flex">
                {/* Barra colorida */}
                <div className="w-1 flex-shrink-0" style={{ backgroundColor: cor }} />

                {/* Horário */}
                <div className="w-20 flex-shrink-0 py-3 px-3 text-xs text-muted tabular border-r border-border/40">
                  <div>{b.inicio}</div>
                  <div className="text-[10px]">{b.fim}</div>
                </div>

                {/* Conteúdo */}
                <div className="flex-1 min-w-0 py-3 px-4">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-sm truncate">{b.titulo}</h3>
                    <span
                      className="text-[9px] uppercase tracking-wide font-semibold px-1.5 py-0.5 rounded flex-shrink-0"
                      style={{ backgroundColor: cor + "20", color: cor }}
                    >
                      {CATEGORIA_LABEL[b.categoria]}
                    </span>
                  </div>
                  <p className="text-xs text-foreground/70 italic">
                    &ldquo;{b.principio}&rdquo;{" "}
                    <span className="not-italic text-muted">— {b.conselheiro}</span>
                  </p>
                  {b.detalhes && (
                    <p className="text-xs text-foreground/60 mt-2">{b.detalhes}</p>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Resumo da matemática */}
      <Card>
        <h3 className="text-sm font-semibold mb-3">A matemática do dia</h3>
        <div className="space-y-1.5 text-sm">
          <ResumoLinha bls={blocos} cat="leitura" />
          <ResumoLinha bls={blocos} cat="conteudo" />
          <ResumoLinha bls={blocos} cat="trabalho" />
          <ResumoLinha bls={blocos} cat="edicao" />
          <ResumoLinha bls={blocos} cat="estudos" />
          <ResumoLinha bls={blocos} cat="faculdade" />
          <ResumoLinha bls={blocos} cat="sono" />
        </div>
        <p className="text-xs text-muted mt-4 pt-3 border-t border-border/40">
          Dias úteis dormem 6h. Fim de semana 8h30. Compensação semanal = ~50h sono / 7 dias ≈
          7h/dia em média.
        </p>
      </Card>

      {/* Conselho */}
      <Card>
        <h3 className="text-sm font-semibold mb-3">Conselho de Alta Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          {[
            ["Aristóteles", "Hábito = excelência"],
            ["Marco Aurélio", "Estoicismo matinal"],
            ["Sêneca", "Tempo é tudo"],
            ["Sócrates / Pitágoras", "Examine sua vida"],
            ["Diógenes", "Minimalismo"],
            ["Epicuro", "Prazeres simples"],
            ["Warren Buffett", "Leitura composta"],
            ["Jeff Bezos", "Decisões cedo + dormir 8h"],
            ["Cal Newport", "Deep Work em bloco"],
            ["Alex Hormozi", "Volume + leverage"],
            ["Naval Ravikant", "Conhecimento que escala"],
            ["Ray Dalio", "Principles + journaling"],
            ["Bill Gates", "Think Week (fim de semana)"],
            ["Matthew Walker", "Sono é base de tudo"],
          ].map(([nome, p]) => (
            <div key={nome} className="flex items-center gap-2 py-1">
              <span className="font-medium text-foreground/80">{nome}</span>
              <span className="text-muted">— {p}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ResumoLinha({ bls, cat }: { bls: BlocoDia[]; cat: BlocoDia["categoria"] }) {
  const total = bls
    .filter((b) => b.categoria === cat)
    .reduce((acc, b) => {
      const [h1, m1] = b.inicio.split(":").map(Number);
      let [h2, m2] = b.fim.split(":").map(Number);
      if (h2 < h1) h2 += 24;
      const mins = h2 * 60 + m2 - (h1 * 60 + m1);
      return acc + mins;
    }, 0);
  if (total === 0) return null;
  const h = Math.floor(total / 60);
  const m = total % 60;
  return (
    <div className="flex justify-between">
      <span className="capitalize" style={{ color: CATEGORIA_COR[cat] }}>
        {CATEGORIA_LABEL[cat]}
      </span>
      <span className="tabular text-foreground/80">
        {h > 0 ? `${h}h` : ""}
        {m > 0 ? `${m.toString().padStart(2, "0")}min` : h > 0 ? "" : "0min"}
      </span>
    </div>
  );
}
