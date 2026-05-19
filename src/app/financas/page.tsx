import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Wallet, ArrowDownCircle, ArrowUpCircle, Tags, Building2, Plus } from "lucide-react";
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

  // Top categorias de saída
  const porCategoria: Record<string, { nome: string; cor: string; total: number; icone: string | null }> = {};
  rows
    .filter((l) => l.tipo === "saida" && l.categorias_financas)
    .forEach((l) => {
      const cat = l.categorias_financas!;
      const k = cat.nome;
      if (!porCategoria[k]) {
        porCategoria[k] = { nome: cat.nome, cor: cat.cor, total: 0, icone: cat.icone };
      }
      porCategoria[k].total += Number(l.valor);
    });

  const topCategorias = Object.values(porCategoria)
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  // Dados pro gráfico (últimos 6 meses)
  const seisMesesAtras = new Date();
  seisMesesAtras.setMonth(seisMesesAtras.getMonth() - 5);
  const inicioGrafico = startOfMonth(seisMesesAtras).toISOString().slice(0, 10);

  const { data: lancamentos6Meses } = await supabase
    .from("lancamentos")
    .select("data, valor, tipo")
    .gte("data", inicioGrafico)
    .order("data");

  const porMes: Record<string, { entrada: number; saida: number }> = {};
  ((lancamentos6Meses as { data: string; valor: number; tipo: "entrada" | "saida" }[]) ?? []).forEach((l) => {
    const mes = l.data.slice(0, 7);
    if (!porMes[mes]) porMes[mes] = { entrada: 0, saida: 0 };
    porMes[mes][l.tipo] += Number(l.valor);
  });

  const chartData = Object.entries(porMes)
    .map(([mes, dados]) => {
      const d = new Date(mes + "-01");
      return {
        mes: format(d, "MMM", { locale: ptBR }),
        entrada: dados.entrada,
        saida: dados.saida,
        saldo: dados.entrada - dados.saida,
      };
    });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Finanças</h1>
        <p className="text-foreground/60 mt-1 capitalize">
          {format(hoje, "MMMM 'de' yyyy", { locale: ptBR })}
        </p>
      </div>

      {/* Cards resumo */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="!p-3 md:!p-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs md:text-sm text-foreground/60 flex items-center gap-1">
              <ArrowUpCircle size={14} className="text-success" />
              Entrada
            </span>
            <span className="text-xl md:text-2xl font-bold text-success">
              R$ {totalEntrada.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </Card>

        <Card className="!p-3 md:!p-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs md:text-sm text-foreground/60 flex items-center gap-1">
              <ArrowDownCircle size={14} className="text-danger" />
              Saída
            </span>
            <span className="text-xl md:text-2xl font-bold text-danger">
              R$ {totalSaida.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </Card>

        <Card className="!p-3 md:!p-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs md:text-sm text-foreground/60">Saldo</span>
            <span className={`text-xl md:text-2xl font-bold ${saldo >= 0 ? "text-success" : "text-danger"}`}>
              R$ {saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </Card>
      </div>

      {/* Ações */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Link
          href="/financas/lancamentos"
          className="p-4 bg-primary hover:bg-primary/90 rounded-xl flex flex-col items-center gap-2 transition-colors text-white"
        >
          <Plus size={28} />
          <span className="font-semibold text-sm md:text-base">Lançar</span>
        </Link>

        <Link
          href="/financas/lancamentos"
          className="p-4 bg-card border border-border hover:bg-border/30 rounded-xl flex flex-col items-center gap-2 transition-colors"
        >
          <Wallet size={28} />
          <span className="font-semibold text-sm md:text-base">Lançamentos</span>
        </Link>

        <Link
          href="/financas/categorias"
          className="p-4 bg-card border border-border hover:bg-border/30 rounded-xl flex flex-col items-center gap-2 transition-colors"
        >
          <Tags size={28} />
          <span className="font-semibold text-sm md:text-base">Categorias</span>
        </Link>

        <Link
          href="/financas/contas"
          className="p-4 bg-card border border-border hover:bg-border/30 rounded-xl flex flex-col items-center gap-2 transition-colors"
        >
          <Building2 size={28} />
          <span className="font-semibold text-sm md:text-base">Contas</span>
        </Link>
      </div>

      {/* Gráfico 6 meses */}
      {chartData.length > 0 && (
        <Card className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Últimos 6 meses</h2>
          <MensalChart data={chartData} />
        </Card>
      )}

      {/* Top categorias */}
      {topCategorias.length > 0 && (
        <Card className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Top categorias do mês (saída)</h2>
          <div className="flex flex-col gap-2">
            {topCategorias.map((c) => {
              const pct = totalSaida > 0 ? (c.total / totalSaida) * 100 : 0;
              return (
                <div key={c.nome} className="flex items-center gap-3">
                  {c.icone && <span className="text-xl">{c.icone}</span>}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{c.nome}</span>
                      <span className="text-sm text-foreground/60">
                        R$ {c.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="h-2 bg-background rounded-full overflow-hidden">
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

      {/* Lançamentos recentes */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Recentes do mês</h2>
          <Link href="/financas/lancamentos" className="text-sm text-primary hover:underline">
            Ver tudo
          </Link>
        </div>

        {rows.length === 0 ? (
          <p className="text-center py-6 text-foreground/60">Nenhum lançamento este mês.</p>
        ) : (
          <div className="flex flex-col gap-1">
            {rows.slice(0, 6).map((l, i) => (
              <div key={i} className="flex items-center justify-between py-2 px-2 hover:bg-border/30 rounded-lg">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {l.categorias_financas?.icone && (
                    <span className="text-xl flex-shrink-0">{l.categorias_financas.icone}</span>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="font-medium truncate">{l.descricao}</div>
                    <div className="text-xs text-foreground/60">
                      {format(new Date(l.data), "dd MMM", { locale: ptBR })}
                      {l.categorias_financas && ` · ${l.categorias_financas.nome}`}
                    </div>
                  </div>
                </div>
                <span className={`font-semibold ${l.tipo === "entrada" ? "text-success" : "text-danger"}`}>
                  {l.tipo === "entrada" ? "+" : "-"}R${" "}
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
