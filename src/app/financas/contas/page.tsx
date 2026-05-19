import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Input, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, Trash2 } from "lucide-react";
import { criarConta, deletarConta } from "../actions";

export default async function ContasPage() {
  const supabase = await createClient();
  const { data: contas } = await supabase
    .from("contas_financas")
    .select("*")
    .order("nome");

  async function deletarAction(formData: FormData) {
    "use server";
    const id = String(formData.get("id"));
    await deletarConta(id);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/financas"
        className="inline-flex items-center gap-1 text-foreground/60 hover:text-foreground mb-4"
      >
        <ChevronLeft size={18} /> Voltar
      </Link>

      <h1 className="text-3xl font-bold mb-6">Contas</h1>

      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Nova conta</h2>
        <form action={criarConta} className="flex flex-col gap-3">
          <Input name="nome" label="Nome" placeholder="Ex: Itaú" required />
          <Select name="tipo" label="Tipo" defaultValue="corrente">
            <option value="corrente">Corrente</option>
            <option value="poupanca">Poupança</option>
            <option value="investimento">Investimento</option>
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
          </Select>
          <div className="grid grid-cols-2 gap-3">
            <Input name="saldo_inicial" type="number" step="0.01" label="Saldo inicial (R$)" defaultValue="0" />
            <Input name="cor" type="color" label="Cor" defaultValue="#3B82F6" />
          </div>
          <Button type="submit" className="self-start">Adicionar</Button>
        </form>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold mb-3">Contas cadastradas</h3>
        {(contas ?? []).length === 0 ? (
          <p className="text-center py-4 text-foreground/60">Nenhuma conta cadastrada.</p>
        ) : (
          <div className="flex flex-col gap-1">
            {(contas ?? []).map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-border/30"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: c.cor }}
                  />
                  <span className="font-medium">{c.nome}</span>
                  {c.tipo && <span className="text-xs text-foreground/60 capitalize">({c.tipo})</span>}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground/60">
                    R$ {Number(c.saldo_inicial).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                  <form action={deletarAction}>
                    <input type="hidden" name="id" value={c.id} />
                    <button
                      type="submit"
                      className="text-foreground/40 hover:text-danger transition-colors p-2"
                      aria-label="Deletar conta"
                    >
                      <Trash2 size={16} />
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
