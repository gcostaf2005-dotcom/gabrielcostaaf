import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { ChevronLeft, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { NovoLancamentoForm } from "./NovoLancamentoForm";
import { deletarLancamento } from "../actions";

export default async function LancamentosPage() {
  const supabase = await createClient();

  const { data: lancamentos } = await supabase
    .from("lancamentos")
    .select("*, categorias_financas(nome, cor, icone), contas_financas(nome, cor)")
    .order("data", { ascending: false })
    .order("created_at", { ascending: false });

  const { data: categorias } = await supabase
    .from("categorias_financas")
    .select("*")
    .order("tipo")
    .order("nome");

  const { data: contas } = await supabase
    .from("contas_financas")
    .select("*")
    .order("nome");

  async function deletarAction(formData: FormData) {
    "use server";
    const id = String(formData.get("id"));
    await deletarLancamento(id);
  }

  type LancamentoRow = {
    id: string;
    data: string;
    descricao: string;
    valor: number;
    tipo: "entrada" | "saida";
    categorias_financas: { nome: string; cor: string; icone: string | null } | null;
    contas_financas: { nome: string; cor: string } | null;
  };

  const rows = (lancamentos ?? []) as never as LancamentoRow[];

  // Agrupa por dia
  const porDia: Record<string, LancamentoRow[]> = {};
  rows.forEach((l) => {
    if (!porDia[l.data]) porDia[l.data] = [];
    porDia[l.data].push(l);
  });

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/financas"
        className="inline-flex items-center gap-1 text-foreground/60 hover:text-foreground mb-4"
      >
        <ChevronLeft size={18} /> Voltar
      </Link>

      <h1 className="text-3xl font-bold mb-6">Lançamentos</h1>

      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Novo lançamento</h2>
        <NovoLancamentoForm categorias={categorias ?? []} contas={contas ?? []} />
      </Card>

      {rows.length === 0 ? (
        <Card>
          <p className="text-center py-8 text-foreground/60">Nenhum lançamento ainda.</p>
        </Card>
      ) : (
        Object.entries(porDia).map(([data, lista]) => (
          <Card key={data} className="mb-3">
            <h3 className="text-sm text-foreground/60 mb-2">
              {format(new Date(data), "EEEE, dd 'de' MMM", { locale: ptBR })}
            </h3>
            <div className="flex flex-col gap-1">
              {lista.map((l) => (
                <div
                  key={l.id}
                  className="flex items-center justify-between py-2 px-2 hover:bg-border/30 rounded-lg"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {l.categorias_financas?.icone && (
                      <span className="text-xl flex-shrink-0">{l.categorias_financas.icone}</span>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="font-medium truncate">{l.descricao}</div>
                      <div className="text-xs text-foreground/60">
                        {l.categorias_financas?.nome ?? "Sem categoria"}
                        {l.contas_financas && ` · ${l.contas_financas.nome}`}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`font-semibold ${
                      l.tipo === "entrada" ? "text-success" : "text-danger"
                    }`}
                  >
                    {l.tipo === "entrada" ? "+" : "-"}R${" "}
                    {Number(l.valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                  <form action={deletarAction} className="ml-2">
                    <input type="hidden" name="id" value={l.id} />
                    <button
                      type="submit"
                      className="text-foreground/40 hover:text-danger transition-colors p-1"
                      aria-label="Deletar lançamento"
                    >
                      <Trash2 size={16} />
                    </button>
                  </form>
                </div>
              ))}
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
