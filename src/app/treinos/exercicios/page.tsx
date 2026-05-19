import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { criarExercicio, deletarExercicio } from "../actions";
import { ChevronLeft, Trash2 } from "lucide-react";
import type { Exercicio } from "@/lib/supabase/types";

const GRUPOS = [
  "peito",
  "costas",
  "perna",
  "ombro",
  "biceps",
  "triceps",
  "abdomen",
  "panturrilha",
  "antebraco",
  "outro",
];

export default async function ExerciciosPage() {
  const supabase = await createClient();
  const { data: exercicios } = await supabase
    .from("exercicios")
    .select("*")
    .order("grupo_muscular")
    .order("nome");

  const grupos: Record<string, Exercicio[]> = {};
  (exercicios ?? []).forEach((e) => {
    const g = e.grupo_muscular || "outro";
    if (!grupos[g]) grupos[g] = [];
    grupos[g].push(e);
  });

  async function deletarAction(formData: FormData) {
    "use server";
    const id = String(formData.get("id"));
    await deletarExercicio(id);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/treinos"
        className="inline-flex items-center gap-1 text-foreground/60 hover:text-foreground mb-4"
      >
        <ChevronLeft size={18} /> Voltar
      </Link>

      <h1 className="text-3xl font-bold mb-6">Exercícios</h1>

      {/* Form pra criar novo */}
      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Novo exercício</h2>
        <form action={criarExercicio} className="flex flex-col gap-3">
          <Input name="nome" label="Nome" required placeholder="Ex: Supino Reto" />
          <Select name="grupo_muscular" label="Grupo muscular" defaultValue="">
            <option value="">Selecionar</option>
            {GRUPOS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </Select>
          <Textarea name="notas" label="Notas (opcional)" placeholder="Ex: Pegada média, parar 2cm do peito" />
          <Button type="submit" className="self-start">Adicionar</Button>
        </form>
      </Card>

      {/* Lista por grupo */}
      {Object.entries(grupos).map(([grupo, lista]) => (
        <Card key={grupo} className="mb-4">
          <h3 className="text-lg font-semibold capitalize mb-3">{grupo}</h3>
          <div className="flex flex-col gap-2">
            {lista.map((e) => (
              <div
                key={e.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-border/30 transition-colors"
              >
                <div>
                  <div className="font-medium">{e.nome}</div>
                  {e.notas && <div className="text-sm text-foreground/60">{e.notas}</div>}
                </div>
                <form action={deletarAction}>
                  <input type="hidden" name="id" value={e.id} />
                  <button
                    type="submit"
                    className="text-foreground/40 hover:text-danger transition-colors p-2"
                    aria-label="Deletar exercício"
                  >
                    <Trash2 size={16} />
                  </button>
                </form>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
