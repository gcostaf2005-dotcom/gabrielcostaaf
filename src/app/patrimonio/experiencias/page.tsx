import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, Trash2, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { criarPatrimonio, deletarPatrimonio } from "../actions";
import type { Patrimonio } from "@/lib/supabase/types";

const CATEGORIAS_EXP = [
  "Viagem",
  "Curso",
  "Evento",
  "Show",
  "Restaurante",
  "Esporte",
  "Lazer",
  "Outro",
];

export default async function ExperienciasPage() {
  const supabase = await createClient();
  const { data: exps } = await supabase
    .from("patrimonio")
    .select("*")
    .eq("tipo", "experiencia")
    .eq("ativo", true)
    .order("data", { ascending: false });

  const lista = (exps ?? []) as Patrimonio[];
  const total = lista.reduce((acc, p) => acc + Number(p.valor), 0);

  async function deletarAction(formData: FormData) {
    "use server";
    const id = String(formData.get("id"));
    await deletarPatrimonio(id, "experiencia");
  }

  async function criarExpAction(formData: FormData) {
    "use server";
    formData.set("tipo", "experiencia");
    await criarPatrimonio(formData);
  }

  const hoje = new Date().toISOString().slice(0, 10);

  // Agrupa por ano
  const porAno: Record<string, Patrimonio[]> = {};
  lista.forEach((p) => {
    const ano = p.data.slice(0, 4);
    if (!porAno[ano]) porAno[ano] = [];
    porAno[ano].push(p);
  });

  return (
    <div className="space-y-6">
      <Link
        href="/patrimonio"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground"
      >
        <ChevronLeft size={16} /> Voltar
      </Link>

      <header>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Experiências</h1>
        <p className="text-sm text-muted mt-1">
          {lista.length} experiências · Total gasto:{" "}
          <span className="text-foreground/80 tabular">
            R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </span>
        </p>
      </header>

      <Card>
        <h2 className="text-sm font-semibold text-foreground/80 mb-4">Registrar experiência</h2>
        <form action={criarExpAction} className="flex flex-col gap-3">
          <Input
            name="nome"
            label="Título"
            placeholder="Ex: Viagem pra Lisboa"
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Select name="categoria" label="Categoria" defaultValue="">
              <option value="">Selecionar</option>
              {CATEGORIAS_EXP.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
            <Input name="data" type="date" label="Data" defaultValue={hoje} required />
          </div>
          <Input
            name="valor"
            type="number"
            step="0.01"
            label="Valor gasto (R$)"
            required
          />
          <Textarea
            name="notas"
            label="O que essa experiência te deixou (opcional)"
            placeholder="Memória, aprendizado, com quem foi..."
          />
          <Button type="submit" className="self-start">
            Registrar
          </Button>
        </form>
      </Card>

      {lista.length === 0 ? (
        <Card>
          <EmptyState
            icon={Sparkles}
            title="Sem experiências registradas"
            description="Viagens, cursos, eventos e momentos que valeram o investimento"
          />
        </Card>
      ) : (
        Object.entries(porAno)
          .sort((a, b) => b[0].localeCompare(a[0]))
          .map(([ano, lista]) => {
            const totalAno = lista.reduce((acc, p) => acc + Number(p.valor), 0);
            return (
              <div key={ano} className="space-y-2">
                <div className="flex items-baseline justify-between px-1">
                  <h3 className="text-xs uppercase tracking-wide text-muted font-semibold">
                    {ano}
                  </h3>
                  <span className="text-xs tabular text-muted">
                    R$ {totalAno.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                {lista.map((p) => (
                  <Card key={p.id} className="!p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="font-medium">{p.nome}</div>
                        <div className="text-xs text-muted mt-0.5">
                          {p.categoria && `${p.categoria} · `}
                          {format(new Date(p.data), "dd 'de' MMM", { locale: ptBR })}
                        </div>
                        {p.notas && (
                          <p className="text-sm text-foreground/70 mt-2 italic">
                            &ldquo;{p.notas}&rdquo;
                          </p>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-semibold tabular">
                          R${" "}
                          {Number(p.valor).toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </div>
                      </div>
                      <form action={deletarAction}>
                        <input type="hidden" name="id" value={p.id} />
                        <button
                          type="submit"
                          className="text-muted hover:text-danger transition-colors p-1"
                          aria-label="Deletar experiência"
                        >
                          <Trash2 size={16} />
                        </button>
                      </form>
                    </div>
                  </Card>
                ))}
              </div>
            );
          })
      )}
    </div>
  );
}
