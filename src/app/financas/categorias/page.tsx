import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Input, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, Trash2 } from "lucide-react";
import { criarCategoria, deletarCategoria } from "../actions";

export default async function CategoriasPage() {
  const supabase = await createClient();
  const { data: categorias } = await supabase
    .from("categorias_financas")
    .select("*")
    .order("tipo")
    .order("nome");

  async function deletarAction(formData: FormData) {
    "use server";
    const id = String(formData.get("id"));
    await deletarCategoria(id);
  }

  const entradas = (categorias ?? []).filter((c) => c.tipo === "entrada");
  const saidas = (categorias ?? []).filter((c) => c.tipo === "saida");

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/financas"
        className="inline-flex items-center gap-1 text-foreground/60 hover:text-foreground mb-4"
      >
        <ChevronLeft size={18} /> Voltar
      </Link>

      <h1 className="text-3xl font-bold mb-6">Categorias</h1>

      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Nova categoria</h2>
        <form action={criarCategoria} className="flex flex-col gap-3">
          <Input name="nome" label="Nome" placeholder="Ex: Combustível" required />
          <Select name="tipo" label="Tipo" defaultValue="saida" required>
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </Select>
          <div className="grid grid-cols-2 gap-3">
            <Input name="icone" label="Ícone (emoji)" placeholder="⛽" />
            <Input name="cor" type="color" label="Cor" defaultValue="#3B82F6" />
          </div>
          <Button type="submit" className="self-start">Adicionar</Button>
        </form>
      </Card>

      <Card className="mb-4">
        <h3 className="text-lg font-semibold mb-3 text-success">Entradas</h3>
        <div className="flex flex-col gap-1">
          {entradas.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-border/30"
            >
              <div className="flex items-center gap-3">
                {c.icone && <span className="text-xl">{c.icone}</span>}
                <span className="font-medium">{c.nome}</span>
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: c.cor }}
                />
              </div>
              <form action={deletarAction}>
                <input type="hidden" name="id" value={c.id} />
                <button
                  type="submit"
                  className="text-foreground/40 hover:text-danger transition-colors p-2"
                  aria-label="Deletar categoria"
                >
                  <Trash2 size={16} />
                </button>
              </form>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold mb-3 text-danger">Saídas</h3>
        <div className="flex flex-col gap-1">
          {saidas.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-border/30"
            >
              <div className="flex items-center gap-3">
                {c.icone && <span className="text-xl">{c.icone}</span>}
                <span className="font-medium">{c.nome}</span>
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: c.cor }}
                />
              </div>
              <form action={deletarAction}>
                <input type="hidden" name="id" value={c.id} />
                <button
                  type="submit"
                  className="text-foreground/40 hover:text-danger transition-colors p-2"
                  aria-label="Deletar categoria"
                >
                  <Trash2 size={16} />
                </button>
              </form>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
