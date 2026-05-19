import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Wallet, Tags, Building2, Plus, TrendingUp, TrendingDown } from "lucide-react";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MensalChart } from "./MensalChart";

export default async function FinancasPage() {
  const supabase = await createClient();

  const hoje = new Date();
  const inicioMes = startOfMonth(hoje).toISOString().slice(0, 10);
  const fimMes = endOfMonth(hoje).toISOString().slice(0, 10);

  type LancamentoRow = {
    data: string;
    descricao: string;
    valor: number;
    tipo: "entrada" | "saida";
    categoria_id: string | null;
    categorias_financas: { nome: string; cor: string; icone: string | null } | null;
  };

  const { data: lancamentosMes } = await supabase
    .from("lancamentos")
    .select("*, categorias_financas(nome, cor, icone)")
    .gte("data", inicioMes)
    .lte("data", fimMes)
    .order("data", { ascending: false });

  const rows = (lancamentosMes ?? []) as never as LancamentoRow[];
  const totalEntrada = rows
    .filter((l) => l.tipo === "entrada")
    .reduce((acc, l) => acc + Number(l.valor), 0);
  const totalSaida = rows
    .filter((l) => l.tipo === "saida")
    .reduce((acc, l) => acc + Number(l.valor), 0);
  const saldo = totalEntrada - totalSaida;

  const porCategoria: Record<string, { nome: string; cor: string; total: number; icone: string | null }> = {};
  rows
    .filter((l) => l.tipo === "saida" && l.categorias_financas)
    .forEach((l) => {
      const cat = l.categorias_financas!;
      if (!porCategoria[cat.nome]) {
        porCategoria[cat.nome] = { nome: cat.nome, cor: cat.cor, total: 0, icone: cat.icone };
      }
      porCategoria[cat.nome].total += Number(l.valor);
    });
  const topCategorias = Object.values(porCategoria)
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  // 6 meses
  const seisAtras = new Date();
  seisAtras.setMonth(seisAtras.getMonth() - 5);
  const inicioGrafico = startOfMonth(seisAtras).toISOString().slice(0, 10);
  const { data: l6m } = await supabase
    .from("lancamentos")
    .select("data, valor, tipo")
    .gte("data", inicioGrafico)
    .order("data");

  const porMes: Record<string, { entrada: number; saida: number }> = {};
  ((l6m as { data: string; valor: number; tipo: "entrada" | "saida" }[]) ?? []).forEach((l) => {
    const mes = l.data.slice(0, 7);
    if (!porMes[mes]) porMes[mes] = { entrada: 0, saida: 0 };
    porMes[mes][l.tipo] += Number(l.valor);
  });
  const chartData = Object.entries(porMes).map(([mes, dados]) => {
    const d = new Date(mes + "-01");
    return {
      mes: format(d, "MMM", { locale: ptBR }),
      entrada: dados.entrada,
      saida: dados.saida,
      saldo: dados.entrada - dados.saida,
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Finanças</h1>
        <p className="text-sm text-muted mt-1 capitalize">
          {format(hoje, "MMMM 'de' yyyy", { locale: ptBR })}
        </p>
      </header>

      {/* Resumo */}
      <div className="grid grid-cols-3 gap-2.5">
        <Card className="!p-4">
          <div className="flex items-center gap-1.5 text-xs text-muted mb-2">
            <TrendingUp size={12} className="text-success" />
            Entrada
          </div>
          <div className="text-lg md:text-xl font-semibold tabular text-success">
            R$ {totalEntrada.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>
        </Card>

        <Card className="!p-4">
          <div className="flex items-center gap-1.5 text-xs text-muted mb-2">
            <TrendingDown size={12} className="text-danger" />
            Saída
          </div>
          <div className="text-lg md:text-xl font-semibold tabular text-danger">
            R$ {totalSaida.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>
        </Card>

        <Card className="!p-4">
          <div className="text-xs text-muted mb-2">Saldo</div>
          <div
            className={`text-lg md:text-xl font-semibold tabular ${
              saldo >= 0 ? "text-foreground" : "text-danger"
            }`}
          >
            R$ {saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>
        </Card>
      </div>

      {/* Ações */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <Link
          href="/financas/lancamentos"
          className="h-24 bg-primary hover:bg-primary/90 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all text-white active:scale-[0.98] shadow-sm shadow-primary/20"
        >
          <Plus size={22} strokeWidth={2.5} />
          <span className="font-semibold text-sm">Lançar</span>
        </Link>

        <Link
          href="/financas/lancamentos"
          className="h-24 bg-card border border-border hover:border-border/100 hover:bg-card/80 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all"
        >
          <Wallet size={22} className="text-muted" />
          <span className="font-medium text-sm">Lançamentos</span>
        </Link>

        <Link
          href="/financas/categorias"
          className="h-24 bg-card border border-border hover:border-border/100 hover:bg-card/80 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all"
        >
          <Tags size={22} className="text-muted" />
          <span className="font-medium text-sm">Categorias</span>
        </Link>

        <Link
          href="/financas/contas"
          className="h-24 bg-card border border-border hover:border-border/100 hover:bg-card/80 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all"
        >
          <Building2 size={22} className="text-muted" />
          <span className="font-medium text-sm">Contas</span>
        </Link>
      </div>

      {/* Gráfico */}
      {chartData.length > 0 && (
        <Card>
          <h2 className="text-sm font-semibold text-foreground/80 mb-4">Últimos 6 meses</h2>
          <MensalChart data={chartData} />
        </Card>
      )}

      {/* Top categorias */}
      {topCategorias.length > 0 && (
        <Card>
          <h2 className="text-sm font-semibold text-foreground/80 mb-4">Top categorias do mês</h2>
          <div className="space-y-3">
            {topCategorias.map((c) => {
              const pct = totalSaida > 0 ? (c.total / totalSaida) * 100 : 0;
              return (
                <div key={c.nome} className="flex items-center gap-3">
                  {c.icone && <span className="text-lg flex-shrink-0">{c.icone}</span>}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm truncate">{c.nome}</span>
                      <span className="text-sm tabular text-muted">
                        R$ {c.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="h-1.5 bg-background rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, backgroundColor: c.cor }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Recentes */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground/80">Recentes</h2>
          <Link
            href="/financas/lancamentos"
            className="text-xs text-muted hover:text-foreground transition-colors"
          >
            Ver tudo
          </Link>
        </div>
        {rows.length === 0 ? (
          <EmptyState
            icon={Wallet}
            title="Nenhum lançamento este mês"
            description="Clica em Lançar pra registrar entradas e saídas"
          />
        ) : (
          <div className="space-y-0.5">
            {rows.slice(0, 6).map((l, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2.5 px-1 border-b border-border/40 last:border-0"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {l.categorias_financas?.icone && (
                    <span className="text-lg flex-shrink-0">{l.categorias_financas.icone}</span>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium truncate">{l.descricao}</div>
                    <div className="text-xs text-muted">
                      {format(new Date(l.data), "dd MMM", { locale: ptBR })}
                      {l.categorias_financas && ` · ${l.categorias_financas.nome}`}
                    </div>
                  </div>
                </div>
                <span
                  className={`text-sm font-semibold tabular ${
                    l.tipo === "entrada" ? "text-success" : "text-foreground"
                  }`}
                >
                  {l.tipo === "entrada" ? "+" : "−"}R${" "}
                  {Number(l.valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
