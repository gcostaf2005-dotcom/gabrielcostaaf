import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, Trash2, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  criarInvestimento,
  deletarInvestimento,
  atualizarValorInvestimento,
} from "../actions";
import type { Investimento } from "@/lib/supabase/types";

const TIPOS: { value: Investimento["tipo"]; label: string }[] = [
  { value: "consorcio", label: "Consórcio" },
  { value: "renda_fixa", label: "Renda Fixa (CDB, LCI, LCA)" },
  { value: "tesouro", label: "Tesouro Direto" },
  { value: "acoes", label: "Ações" },
  { value: "fii", label: "FIIs" },
  { value: "cripto", label: "Criptos" },
  { value: "fundos", label: "Fundos" },
  { value: "outros", label: "Outros" },
];

const tipoLabel: Record<Investimento["tipo"], string> = {
  renda_fixa: "Renda Fixa",
  tesouro: "Tesouro",
  acoes: "Ações",
  fii: "FII",
  cripto: "Cripto",
  fundos: "Fundo",
  consorcio: "Consórcio",
  outros: "Outros",
};

const tipoCor: Record<Investimento["tipo"], string> = {
  renda_fixa: "bg-success/10 text-success",
  tesouro: "bg-success/10 text-success",
  acoes: "bg-primary/10 text-primary",
  fii: "bg-violet/10 text-violet",
  cripto: "bg-warning/10 text-warning",
  fundos: "bg-primary/10 text-primary",
  consorcio: "bg-violet/10 text-violet",
  outros: "bg-muted/20 text-muted",
};

export default async function InvestimentosPage() {
  const supabase = await createClient();
  const { data: invs } = await supabase
    .from("investimentos")
    .select("*")
    .eq("ativo", true)
    .order("data_aporte", { ascending: false });

  const lista = (invs ?? []) as Investimento[];

  const totalAporte = lista.reduce((a, i) => a + Number(i.valor_aporte), 0);
  const totalAtual = lista.reduce(
    (a, i) => a + Number(i.valor_atual ?? i.valor_aporte),
    0
  );
  const rendimento = totalAtual - totalAporte;
  const rendimentoPct = totalAporte > 0 ? (rendimento / totalAporte) * 100 : 0;

  async function deletarAction(formData: FormData) {
    "use server";
    const id = String(formData.get("id"));
    await deletarInvestimento(id);
  }

  const hoje = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-6">
      <Link
        href="/patrimonio"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground"
      >
        <ChevronLeft size={16} /> Voltar
      </Link>

      <header>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Investimentos</h1>
        <p className="text-sm text-muted mt-1">{lista.length} aportes ativos</p>
      </header>

      {/* Resumo */}
      <div className="grid grid-cols-3 gap-2.5">
        <Card className="!p-4">
          <p className="text-xs text-muted mb-2">Investido</p>
          <p className="text-lg md:text-xl font-semibold tabular tracking-tight">
            R$ {totalAporte.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
        </Card>
        <Card className="!p-4">
          <p className="text-xs text-muted mb-2">Posição atual</p>
          <p className="text-lg md:text-xl font-semibold tabular tracking-tight">
            R$ {totalAtual.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
        </Card>
        <Card className="!p-4">
          <p className="text-xs text-muted mb-2">Rendimento</p>
          <p
            className={`text-lg md:text-xl font-semibold tabular tracking-tight ${
              rendimento >= 0 ? "text-success" : "text-danger"
            }`}
          >
            {rendimento >= 0 ? "+" : ""}
            {rendimentoPct.toFixed(1)}%
          </p>
        </Card>
      </div>

      <Card>
        <h2 className="text-sm font-semibold text-foreground/80 mb-4">Novo aporte</h2>
        <form action={criarInvestimento} className="flex flex-col gap-3">
          <Input name="nome" label="Nome do ativo" placeholder="Ex: CDB Inter 110% CDI" required />
          <div className="grid grid-cols-2 gap-3">
            <Select name="tipo" label="Tipo" defaultValue="renda_fixa" required>
              {TIPOS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </Select>
            <Input name="instituicao" label="Instituição" placeholder="Ex: Inter, XP" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              name="valor_aporte"
              type="number"
              step="0.01"
              label="Valor aportado (R$)"
              required
            />
            <Input
              name="data_aporte"
              type="date"
              label="Data do aporte"
              defaultValue={hoje}
              required
            />
          </div>
          <Input
            name="valor_atual"
            type="number"
            step="0.01"
            label="Valor atual (opcional)"
            placeholder="Atualize manualmente quando quiser"
          />
          <Textarea name="notas" label="Notas" />
          <Button type="submit" className="self-start">
            Adicionar
          </Button>
        </form>
      </Card>

      {lista.length === 0 ? (
        <Card>
          <EmptyState
            icon={TrendingUp}
            title="Sem investimentos cadastrados"
            description="Registre seus aportes pra acompanhar a evolução"
          />
        </Card>
      ) : (
        <div className="space-y-2">
          {lista.map((i) => {
            const rend = Number(i.valor_atual ?? i.valor_aporte) - Number(i.valor_aporte);
            const rendPct =
              Number(i.valor_aporte) > 0
                ? (rend / Number(i.valor_aporte)) * 100
                : 0;
            return (
              <Card key={i.id} className="!p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{i.nome}</span>
                      <span
                        className={`text-[10px] uppercase tracking-wide font-semibold px-1.5 py-0.5 rounded ${
                          tipoCor[i.tipo]
                        }`}
                      >
                        {tipoLabel[i.tipo]}
                      </span>
                    </div>
                    <div className="text-xs text-muted">
                      {i.instituicao && `${i.instituicao} · `}
                      Aporte em {format(new Date(i.data_aporte), "MMM yyyy", { locale: ptBR })}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-semibold tabular">
                      R${" "}
                      {Number(i.valor_atual ?? i.valor_aporte).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                    <div className="text-xs text-muted tabular">
                      Aporte: R${" "}
                      {Number(i.valor_aporte).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </div>
                    {i.valor_atual !== null && (
                      <div
                        className={`text-xs font-medium tabular mt-1 ${
                          rend >= 0 ? "text-success" : "text-danger"
                        }`}
                      >
                        {rend >= 0 ? "+" : ""}
                        {rendPct.toFixed(1)}%
                      </div>
                    )}
                  </div>
                  <form action={deletarAction}>
                    <input type="hidden" name="id" value={i.id} />
                    <button
                      type="submit"
                      className="text-muted hover:text-danger transition-colors p-1"
                      aria-label="Deletar investimento"
                    >
                      <Trash2 size={16} />
                    </button>
                  </form>
                </div>

                <form
                  action={atualizarValorInvestimento}
                  className="mt-3 pt-3 border-t border-border/40 flex items-end gap-2"
                >
                  <input type="hidden" name="id" value={i.id} />
                  <Input
                    name="valor_atual"
                    type="number"
                    step="0.01"
                    label="Atualizar valor"
                    placeholder="Novo valor"
                    className="flex-1"
                  />
                  <Button type="submit" variant="secondary" size="sm">
                    Atualizar
                  </Button>
                </form>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
