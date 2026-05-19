import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { ChevronLeft, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { deletarSessao } from "../actions";

export default async function HistoricoPage() {
  const supabase = await createClient();

  const { data: sessoes } = await supabase
    .from("sessoes_treino")
    .select("*, sessao_sets(id)")
    .order("data", { ascending: false });

  async function deletarAction(formData: FormData) {
    "use server";
    const id = String(formData.get("id"));
    await deletarSessao(id);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/treinos"
        className="inline-flex items-center gap-1 text-foreground/60 hover:text-foreground mb-4"
      >
        <ChevronLeft size={18} /> Voltar
      </Link>

      <h1 className="text-3xl font-bold mb-6">Histórico de Treinos</h1>

      {!sessoes || sessoes.length === 0 ? (
        <Card>
          <p className="text-center py-8 text-foreground/60">
            Nenhuma sessão registrada ainda.
          </p>
        </Card>
      ) : (
        <div className="flex flex-col gap-2">
          {sessoes.map((s) => {
            const totalSets = (s.sessao_sets as { id: string }[] | null)?.length ?? 0;
            return (
              <Card key={s.id} className="!p-3">
                <div className="flex items-center justify-between gap-3">
                  <Link
                    href={`/treinos/sessao/${s.id}`}
                    className="flex-1 flex items-center justify-between hover:opacity-80 transition-opacity"
                  >
                    <div>
                      <div className="font-medium">
                        {format(new Date(s.data), "EEEE, dd 'de' MMM 'de' yyyy", {
                          locale: ptBR,
                        })}
                      </div>
                      <div className="text-sm text-foreground/60 mt-0.5">
                        {totalSets} sets
                        {s.duracao_min && ` · ${s.duracao_min}min`}
                        {s.rpe && ` · RPE ${s.rpe}`}
                        {!s.duracao_min && " · Em andamento"}
                      </div>
                    </div>
                  </Link>
                  <form action={deletarAction}>
                    <input type="hidden" name="id" value={s.id} />
                    <button
                      type="submit"
                      className="text-foreground/40 hover:text-danger transition-colors p-2"
                      aria-label="Deletar sessão"
                    >
                      <Trash2 size={16} />
                    </button>
                  </form>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
