"use client";

import { useState, useTransition } from "react";
import { Check, Trash2 } from "lucide-react";
import { toggleTarefa, deletarTarefa } from "./actions";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Tarefa } from "@/lib/supabase/types";

const prioridadeCor: Record<number, string> = {
  1: "bg-foreground/40",
  2: "bg-warning",
  3: "bg-danger",
};

const prioridadeLabel: Record<number, string> = {
  1: "Baixa",
  2: "Média",
  3: "Alta",
};

interface Props {
  tarefa: Tarefa;
}

export function TarefaToggle({ tarefa }: Props) {
  const [pending, startTransition] = useTransition();
  const [otimista, setOtimista] = useState(tarefa.concluida);

  const onToggle = () => {
    setOtimista(!otimista);
    startTransition(async () => {
      await toggleTarefa(tarefa.id, !tarefa.concluida);
    });
  };

  const onDelete = () => {
    if (!confirm("Deletar essa tarefa?")) return;
    startTransition(async () => {
      await deletarTarefa(tarefa.id);
    });
  };

  return (
    <div className={`flex items-center gap-3 p-2 rounded-lg hover:bg-border/30 transition-colors ${pending ? "opacity-50" : ""}`}>
      <button
        type="button"
        onClick={onToggle}
        disabled={pending}
        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
          otimista
            ? "bg-success border-success"
            : "border-foreground/40 hover:border-primary"
        }`}
        aria-label={otimista ? "Marcar como pendente" : "Marcar como concluída"}
      >
        {otimista && <Check size={14} className="text-white" />}
      </button>

      <div className="flex-1 min-w-0">
        <div className={`font-medium ${otimista ? "line-through text-foreground/40" : ""}`}>
          {tarefa.titulo}
        </div>
        <div className="text-xs text-foreground/60 flex items-center gap-2 mt-0.5">
          {tarefa.prioridade && (
            <span className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${prioridadeCor[tarefa.prioridade]}`} />
              {prioridadeLabel[tarefa.prioridade]}
            </span>
          )}
          {tarefa.data_vencimento && (
            <span>
              {format(new Date(tarefa.data_vencimento), "dd 'de' MMM", { locale: ptBR })}
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onDelete}
        disabled={pending}
        className="text-foreground/40 hover:text-danger transition-colors p-1"
        aria-label="Deletar tarefa"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
