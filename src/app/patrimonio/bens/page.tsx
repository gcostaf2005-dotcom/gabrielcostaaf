import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, Trash2, Package } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { criarPatrimonio, deletarPatrimonio } from "../actions";
import type { Patrimonio } from "@/lib/supabase/types";

const CATEGORIAS_BENS = [
  "Veículo",
  "Eletrônico",
  "Móvel",
  "Imóvel",
  "Eletrodoméstico",
  "Acessório",
  "Outro",
];

export default async function BensPage() {
  const supabase = await createClient();
  const { data: bens } = await supabase
    .from("patrimonio")
    .select("*")
    .eq("tipo", "bem")
    .eq("ativo", true)
    .order("data", { ascending: false });

  const lista = (bens ?? []) as Patrimonio[];

  const total = lista.reduce((acc, p) => acc + Number(p.valor_atual ?? p.valor), 0);
  const totalCompra = lista.reduce((acc, p) => acc + Number(p.valor), 0);
  const depreciacao = totalCompra - total;

  async function deletarAction(formData: FormData) {
    "use server";
    const id = String(formData.get("id"));
    await deletarPatrimonio(id, "bem");
  }

  async function criarBemAction(formData: FormData) {
    "use server";
    formData.set("tipo", "bem");
    await criarPatrimonio(formData);
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
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Bens</h1>
        <p className="text-sm text-muted mt-1">
          {lista.length} bens · Total atual:{" "}
          <span className="text-foreground/80 tabular">
            R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </span>
          {depreciacao !== 0 && (
            <span className={depreciacao > 0 ? "text-danger" : "text-success"}>
              {" "}
              ({depreciacao > 0 ? "−" : "+"}R${" "}
              {Math.abs(depreciacao).toLocaleString("pt-BR", { minimumFractionDigits: 2 })})
            </span>
          )}
        </p>
      </header>

      <Card>
        <h2 className="text-sm font-semibold text-foreground/80 mb-4">Adicionar bem</h2>
        <form action={criarBemAction} className="flex flex-col gap-3">
          <Input name="nome" label="Nome" placeholder="Ex: iPhone 15 Pro" required />
          <div className="grid grid-cols-2 gap-3">
            <Select name="categoria" label="Categoria" defaultValue="">
              <option value="">Selecionar</option>
              {CATEGORIAS_BENS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
            <Input name="data" type="date" label="Data compra" defaultValue={hoje} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              name="valor"
              type="number"
              step="0.01"
              label="Valor pago (R$)"
              required
            />
            <Input
              name="valor_atual"
              type="number"
              step="0.01"
              label="Valor atual (opcional)"
              placeholder="Se diferente"
            />
          </div>
          <Textarea name="notas" label="Notas (opcional)" />
          <Button type="submit" className="self-start">
            Adicionar
          </Button>
        </form>
      </Card>

      {lista.length === 0 ? (
        <Card>
          <EmptyState
            icon={Package}
            title="Nenhum bem registrado"
            description="Adicione veículos, eletrônicos, móveis e outros bens duráveis"
          />
        </Card>
      ) : (
        <div className="space-y-2">
          {lista.map((p) => (
            <Card key={p.id} className="!p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="font-medium">{p.nome}</div>
                  <div className="text-xs text-muted mt-0.5">
                    {p.categoria && `${p.categoria} · `}
                    Comprado em {format(new Date(p.data), "MMM yyyy", { locale: ptBR })}
                  </div>
                  {p.notas && <p className="text-sm text-foreground/70 mt-2">{p.notas}</p>}
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-semibold tabular">
                    R${" "}
                    {Number(p.valor_atual ?? p.valor).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                  {p.valor_atual !== null && p.valor_atual !== p.valor && (
                    <div className="text-xs text-muted tabular mt-0.5">
                      Pago: R${" "}
                      {Number(p.valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </div>
                  )}
                </div>
                <form action={deletarAction}>
                  <input type="hidden" name="id" value={p.id} />
                  <button
                    type="submit"
                    className="text-muted hover:text-danger transition-colors p-1"
                    aria-label="Deletar bem"
                  >
                    <Trash2 size={16} />
                  </button>
                </form>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
