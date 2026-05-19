import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ChevronLeft } from "lucide-react";
import { criarTarefa } from "../actions";
import { TarefaToggle } from "../TarefaToggle";

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
