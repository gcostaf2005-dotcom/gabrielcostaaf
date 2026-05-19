import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Calendar, ListTodo, Plus, MapPin, Clock } from "lucide-react";
import { format, startOfDay, endOfDay, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TarefaToggle } from "./TarefaToggle";

export default async function AgendaPage() {
  const supabase = await createClient();

  const hoje = startOfDay(new Date());
  const fim7Dias = endOfDay(addDays(hoje, 7));

  const { data: eventos } = await supabase
    .from("eventos")
    .select("*")
    .gte("data_inicio", hoje.toISOString())
    .lte("data_inicio", fim7Dias.toISOString())
    .order("data_inicio");

  const { data: tarefasPendentes } = await supabase
    .from("tarefas")
    .select("*")
    .eq("concluida", false)
    .order("prioridade", { ascending: false, nullsFirst: false })
    .order("data_vencimento", { nullsFirst: false });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Agenda</h1>
        <p className="text-foreground/60 mt-1 capitalize">
          {format(hoje, "EEEE, dd 'de' MMM", { locale: ptBR })}
        </p>
      </div>

      {/* Ações */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <Link
          href="/agenda/eventos"
          className="p-4 bg-primary hover:bg-primary/90 rounded-xl flex flex-col items-center gap-2 transition-colors text-white"
        >
          <Plus size={28} />
          <span className="font-semibold text-sm md:text-base">Novo Evento</span>
        </Link>

        <Link
          href="/agenda/eventos"
          className="p-4 bg-card border border-border hover:bg-border/30 rounded-xl flex flex-col items-center gap-2 transition-colors"
        >
          <Calendar size={28} />
          <span className="font-semibold text-sm md:text-base">Eventos</span>
        </Link>

        <Link
          href="/agenda/tarefas"
          className="p-4 bg-card border border-border hover:bg-border/30 rounded-xl flex flex-col items-center gap-2 transition-colors col-span-2 md:col-span-1"
        >
          <ListTodo size={28} />
          <span className="font-semibold text-sm md:text-base">Tarefas</span>
        </Link>
      </div>

      {/* Próximos eventos */}
      <Card className="mb-4">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Calendar size={20} />
          Próximos 7 dias
        </h2>
        {!eventos || eventos.length === 0 ? (
          <p className="text-center py-6 text-foreground/60">Nenhum evento nos próximos 7 dias.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {eventos.map((e) => (
              <div
                key={e.id}
                className="flex items-start gap-3 p-3 bg-background rounded-lg"
              >
                <div className="flex-shrink-0 text-center min-w-[48px]">
                  <div className="text-xs text-foreground/60 uppercase">
                    {format(new Date(e.data_inicio), "MMM", { locale: ptBR })}
                  </div>
                  <div className="text-xl font-bold">
                    {format(new Date(e.data_inicio), "dd")}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{e.titulo}</div>
                  <div className="text-sm text-foreground/60 flex flex-wrap items-center gap-3 mt-1">
                    {!e.dia_inteiro && (
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {format(new Date(e.data_inicio), "HH:mm")}
                      </span>
                    )}
                    {e.local && (
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {e.local}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Tarefas pendentes */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ListTodo size={20} />
            Tarefas pendentes
          </h2>
          {tarefasPendentes && tarefasPendentes.length > 0 && (
            <Link href="/agenda/tarefas" className="text-sm text-primary hover:underline">
              Ver tudo
            </Link>
          )}
        </div>

        {!tarefasPendentes || tarefasPendentes.length === 0 ? (
          <p className="text-center py-6 text-foreground/60">Nenhuma tarefa pendente.</p>
        ) : (
          <div className="flex flex-col gap-1">
            {tarefasPendentes.slice(0, 6).map((t) => (
              <TarefaToggle key={t.id} tarefa={t} />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
