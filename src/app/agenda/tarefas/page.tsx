import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, Film, Smartphone } from "lucide-react";
import { criarTarefa } from "../actions";
import { TarefaToggle } from "../TarefaToggle";
import { ROTINA_CONTEUDO, META_STORIES } from "@/lib/rotinaConteudo";

export default async function TarefasPage() {
  const supabase = await createClient();
  const { data: tarefas } = await supabase
    .from("tarefas")
    .select("*")
    .order("concluida")
    .order("prioridade", { ascending: false, nullsFirst: false })
    .order("data_vencimento", { nullsFirst: false });

  const pendentes = (tarefas ?? []).filter((t) => !t.concluida);
  const concluidas = (tarefas ?? []).filter((t) => t.concluida);

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/agenda"
        className="inline-flex items-center gap-1 text-foreground/60 hover:text-foreground mb-4"
      >
        <ChevronLeft size={18} /> Voltar
      </Link>

      <h1 className="text-3xl font-bold mb-6">Tarefas</h1>

      {/* Rotina de conteúdo semanal */}
      <Card className="mb-6">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-lg font-semibold">Rotina de Conteúdo</h2>
          <span className="text-xs text-muted">{META_STORIES}</span>
        </div>
        <div className="space-y-1.5">
          {ROTINA_CONTEUDO.map((r) => (
            <div
              key={r.dia}
              className="flex items-center gap-3 p-2.5 bg-background rounded-lg"
            >
              <div className="flex-shrink-0 w-10 text-xs font-semibold uppercase text-muted">
                {r.label.slice(0, 3)}
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0 w-40">
                <Film size={13} className={r.reel ? "text-violet" : "text-muted"} />
                <span className={`text-sm ${r.reel ? "" : "text-muted"}`}>
                  {r.reel ?? "—"}
                </span>
              </div>
              <div className="flex items-center gap-1.5 min-w-0 flex-1">
                <Smartphone size={13} className="text-primary flex-shrink-0" />
                <span className="text-xs text-foreground/70 truncate">
                  {r.stories.join(" · ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Nova tarefa</h2>
        <form action={criarTarefa} className="flex flex-col gap-3">
          <Input name="titulo" label="Título" placeholder="Ex: Ligar pro cliente X" required />
          <div className="grid grid-cols-2 gap-3">
            <Input name="data_vencimento" type="date" label="Prazo (opcional)" />
            <Select name="prioridade" label="Prioridade" defaultValue="">
              <option value="">Sem prioridade</option>
              <option value="1">Baixa</option>
              <option value="2">Média</option>
              <option value="3">Alta</option>
            </Select>
          </div>
          <Textarea name="descricao" label="Descrição (opcional)" />
          <Button type="submit" className="self-start">Adicionar</Button>
        </form>
      </Card>

      <Card className="mb-4">
        <h3 className="text-lg font-semibold mb-3">
          Pendentes {pendentes.length > 0 && `(${pendentes.length})`}
        </h3>
        {pendentes.length === 0 ? (
          <p className="text-center py-4 text-foreground/60">Nenhuma tarefa pendente.</p>
        ) : (
          <div className="flex flex-col gap-1">
            {pendentes.map((t) => (
              <TarefaToggle key={t.id} tarefa={t} />
            ))}
          </div>
        )}
      </Card>

      {concluidas.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold mb-3 text-foreground/60">
            Concluídas ({concluidas.length})
          </h3>
          <div className="flex flex-col gap-1">
            {concluidas.map((t) => (
              <TarefaToggle key={t.id} tarefa={t} />
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
