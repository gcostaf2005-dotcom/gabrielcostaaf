import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, Trash2, MapPin, Clock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { criarEvento, deletarEvento } from "../actions";

export default async function EventosPage() {
  const supabase = await createClient();
  const { data: eventos } = await supabase
    .from("eventos")
    .select("*")
    .order("data_inicio", { ascending: false });

  async function deletarAction(formData: FormData) {
    "use server";
    const id = String(formData.get("id"));
    await deletarEvento(id);
  }

  // Default: agora + 1h, formato datetime-local
  const agora = new Date();
  agora.setHours(agora.getHours() + 1, 0, 0, 0);
  const defaultDatetime = agora.toISOString().slice(0, 16);

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/agenda"
        className="inline-flex items-center gap-1 text-foreground/60 hover:text-foreground mb-4"
      >
        <ChevronLeft size={18} /> Voltar
      </Link>

      <h1 className="text-3xl font-bold mb-6">Eventos</h1>

      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Novo evento</h2>
        <form action={criarEvento} className="flex flex-col gap-3">
          <Input name="titulo" label="Título" placeholder="Ex: Reunião com cliente" required />
          <div className="grid grid-cols-2 gap-3">
            <Input
              name="data_inicio"
              type="datetime-local"
              label="Início"
              defaultValue={defaultDatetime}
              required
            />
            <Input name="data_fim" type="datetime-local" label="Fim (opcional)" />
          </div>
          <Input name="local" label="Local (opcional)" placeholder="Ex: Zoom, escritório" />
          <Textarea name="descricao" label="Descrição (opcional)" />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="dia_inteiro" className="w-4 h-4" />
            Dia inteiro
          </label>
          <Button type="submit" className="self-start">Adicionar</Button>
        </form>
      </Card>

      {!eventos || eventos.length === 0 ? (
        <Card>
          <p className="text-center py-8 text-foreground/60">Nenhum evento cadastrado.</p>
        </Card>
      ) : (
        <div className="flex flex-col gap-2">
          {eventos.map((e) => (
            <Card key={e.id} className="!p-3">
              <div className="flex items-start gap-3">
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
                        {e.data_fim && ` - ${format(new Date(e.data_fim), "HH:mm")}`}
                      </span>
                    )}
                    {e.local && (
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {e.local}
                      </span>
                    )}
                  </div>
                  {e.descricao && (
                    <p className="text-sm text-foreground/60 mt-2">{e.descricao}</p>
                  )}
                </div>
                <form action={deletarAction}>
                  <input type="hidden" name="id" value={e.id} />
                  <button
                    type="submit"
                    className="text-foreground/40 hover:text-danger transition-colors p-2"
                    aria-label="Deletar evento"
                  >
                    <Trash2 size={16} />
                  </button>
                </form>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
