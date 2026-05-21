import { createClient } from "@/lib/supabase/server";
import { AgendaCalendario } from "./AgendaCalendario";
import type { Evento, Tarefa } from "@/lib/supabase/types";

export default async function AgendaPage() {
  const supabase = await createClient();

  const { data: eventos } = await supabase
    .from("eventos")
    .select("*")
    .order("data_inicio");

  const { data: tarefas } = await supabase
    .from("tarefas")
    .select("*")
    .order("data_vencimento", { nullsFirst: false });

  return (
    <AgendaCalendario
      eventos={(eventos ?? []) as Evento[]}
      tarefas={(tarefas ?? []) as Tarefa[]}
    />
  );
}
