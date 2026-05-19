import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  Package,
  Sparkles,
  TrendingUp,
  ChevronRight,
  Wallet2,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Patrimonio, Investimento } from "@/lib/supabase/types";

const tipoLabel: Record<Investimento["tipo"], string> = {
  renda_fixa: "Renda Fixa",
  tesouro: "Tesouro Direto",
  acoes: "Ações",
  fii: "FIIs",
  cripto: "Criptos",
  fundos: "Fundos",
  consorcio: "Consórcios",
  outros: "Outros",
};

const tipoCor: Record<Investimento["tipo"], string> = {
  renda_fixa: "#10b981",
  tesouro: "#22c55e",
  acoes: "#3b82f6",
  fii: "#8b5cf6",
  cripto: "#f59e0b",
  fundos: "#06b6d4",
  consorcio: "#a855f7",
  outros: "#737373",
};

export default async function PatrimonioPage() {
  const supabase = await createClient();

  const { data: bensExp } = await supabase
    .from("patrimonio")
    .select("*")
    .eq("ativo", true);

  const { data: invs } = await supabase
    .from("investimentos")
    .select("*")
    .eq("ativo", true);

  const bensTotal = ((bensExp ?? []) as Patrimonio[])
    .filter((p) => p.tipo === "bem")
    .reduce((acc, p) => acc + Number(p.valor_atual ?? p.valor), 0);

  const expTotal = ((bensExp ?? []) as Patrimonio[])
    .filter((p) => p.tipo === "experiencia")
    .reduce((acc, p) => acc + Number(p.valor), 0);

  const invsList = (invs ?? []) as Investimento[];
  const investidoTotal = invsList.reduce((acc, i) => acc + Number(i.valor_aporte), 0);
  const valorAtualTotal = invsList.reduce(
    (acc, i) => acc + Number(i.valor_atual ?? i.valor_aporte),
    0
  );
  const rendimentoTotal = valorAtualTotal - investidoTotal;
  const rendimentoPct = investidoTotal > 0 ? (rendimentoTotal / investidoTotal) * 100 : 0;

  // Distribuição por tipo
  const porTipo: Record<string, number> = {};
  invsList.forEach((i) => {
    porTipo[i.tipo] = (porTipo[i.tipo] ?? 0) + Number(i.valor_atual ?? i.valor_aporte);
  });
  const distribuicao = Object.entries(porTipo)
    .map(([tipo, total]) => ({
      tipo: tipo as Investimento["tipo"],
      total,
      pct: valorAtualTotal > 0 ? (total / valorAtualTotal) * 100 : 0,
    }))
    .sort((a, b) => b.total - a.total);

  const patrimonioTotal = bensTotal + valorAtualTotal;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Patrimônio</h1>
        <p className="text-sm text-muted mt-1">Bens, experiências e investimentos</p>
      </header>

      {/* Patrimônio total */}
      <Card>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Wallet2 size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted uppercase tracking-wide">Patrimônio total</p>
            <p className="text-3xl font-semibold tabular tracking-tight">
              R$ {patrimonioTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="p-3 bg-background rounded-lg">
            <p className="text-xs text-muted">Bens</p>
            <p className="text-base font-semibold tabular mt-0.5">
              R$ {bensTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="p-3 bg-background rounded-lg">
            <p className="text-xs text-muted">Investimentos</p>
            <p className="text-base font-semibold tabular mt-0.5">
              R$ {valorAtualTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </Card>

      {/* Ações */}
      <div className="grid grid-cols-3 gap-2.5">
        <Link
          href="/patrimonio/bens"
          className="h-24 bg-card border border-border hover:border-border/100 hover:bg-card/80 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all"
        >
          <Package size={22} className="text-muted" />
          <span className="font-medium text-sm">Bens</span>
        </Link>

        <Link
          href="/patrimonio/experiencias"
          className="h-24 bg-card border border-border hover:border-border/100 hover:bg-card/80 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all"
        >
          <Sparkles size={22} className="text-muted" />
          <span className="font-medium text-sm">Experiências</span>
        </Link>

        <Link
          href="/patrimonio/investimentos"
          className="h-24 bg-card border border-border hover:border-border/100 hover:bg-card/80 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all"
        >
          <TrendingUp size={22} className="text-muted" />
          <span className="font-medium text-sm">Investimentos</span>
        </Link>
      </div>

      {/* Rendimento dos investimentos */}
      {invsList.length > 0 && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground/80">Investimentos</h2>
            <Link
              href="/patrimonio/investimentos"
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              Ver tudo
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <div>
              <p className="text-xs text-muted">Investido</p>
              <p className="text-lg font-semibold tabular tracking-tight mt-1">
                R$ {investidoTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted">Rendimento</p>
              <p
                className={`text-lg font-semibold tabular tracking-tight mt-1 ${
                  rendimentoTotal >= 0 ? "text-success" : "text-danger"
                }`}
              >
                {rendimentoTotal >= 0 ? "+" : ""}R${" "}
                {rendimentoTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                <span className="text-xs ml-1.5">
                  ({rendimentoTotal >= 0 ? "+" : ""}
                  {rendimentoPct.toFixed(1)}%)
                </span>
              </p>
            </div>
          </div>

          {distribuicao.length > 0 && (
            <div>
              <p className="text-xs text-muted mb-2">Distribuição</p>
              <div className="space-y-2">
                {distribuicao.map((d) => (
                  <div key={d.tipo} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5 text-sm">
                        <span>{tipoLabel[d.tipo]}</span>
                        <span className="tabular text-muted">{d.pct.toFixed(1)}%</span>
                      </div>
                      <div className="h-1.5 bg-background rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${d.pct}%`, backgroundColor: tipoCor[d.tipo] }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Bens + Experiências */}
      {(bensExp?.length ?? 0) === 0 && invsList.length === 0 ? (
        <Card>
          <EmptyState
            icon={Wallet2}
            title="Comece a registrar seu patrimônio"
            description="Adicione bens, experiências marcantes ou seus investimentos"
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bensTotal > 0 && (
            <Card>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-foreground/80">Últimos bens</h2>
                <Link
                  href="/patrimonio/bens"
                  className="text-xs text-muted hover:text-foreground transition-colors"
                >
                  Ver tudo
                </Link>
              </div>
              <div className="space-y-0.5">
                {((bensExp ?? []) as Patrimonio[])
                  .filter((p) => p.tipo === "bem")
                  .slice(0, 4)
                  .map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between py-2 border-b border-border/40 last:border-0"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium truncate">{p.nome}</div>
                        <div className="text-xs text-muted">
                          {p.categoria && `${p.categoria} · `}
                          {format(new Date(p.data), "MMM yyyy", { locale: ptBR })}
                        </div>
                      </div>
                      <span className="text-sm font-semibold tabular">
                        R${" "}
                        {Number(p.valor_atual ?? p.valor).toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  ))}
              </div>
            </Card>
          )}

          {expTotal > 0 && (
            <Card>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-foreground/80">Experiências</h2>
                <Link
                  href="/patrimonio/experiencias"
                  className="text-xs text-muted hover:text-foreground transition-colors"
                >
                  Ver tudo
                </Link>
              </div>
              <p className="text-xs text-muted mb-3">
                Total gasto:{" "}
                <span className="text-foreground/80 tabular">
                  R$ {expTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </p>
              <div className="space-y-0.5">
                {((bensExp ?? []) as Patrimonio[])
                  .filter((p) => p.tipo === "experiencia")
                  .slice(0, 4)
                  .map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between py-2 border-b border-border/40 last:border-0"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium truncate">{p.nome}</div>
                        <div className="text-xs text-muted">
                          {p.categoria && `${p.categoria} · `}
                          {format(new Date(p.data), "MMM yyyy", { locale: ptBR })}
                        </div>
                      </div>
                      <span className="text-sm font-semibold tabular">
                        R${" "}
                        {Number(p.valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
