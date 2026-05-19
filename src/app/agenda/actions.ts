"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function criarEvento(formData: FormData) {
  const supabase = await createClient();

  const titulo = String(formData.get("titulo") ?? "").trim();
  const descricao = String(formData.get("descricao") ?? "").trim() || null;
  const data_inicio = String(formData.get("data_inicio") ?? "");
  const data_fim = String(formData.get("data_fim") ?? "") || null;
  const dia_inteiro = formData.get("dia_inteiro") === "on";
  const local = String(formData.get("local") ?? "").trim() || null;

  if (!titulo) throw new Error("Título obrigatório");
  if (!data_inicio) throw new Error("Data de início obrigatória");

  const { error } = await supabase.from("eventos").insert({
    titulo,
    descricao,
    data_inicio,
    data_fim,
    dia_inteiro,
    local,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/agenda");
  revalidatePath("/agenda/eventos");
}

export async function deletarEvento(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("eventos").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/agenda");
  revalidatePath("/agenda/eventos");
}

export async function criarTarefa(formData: FormData) {
  const supabase = await createClient();

  const titulo = String(formData.get("titulo") ?? "").trim();
  const descricao = String(formData.get("descricao") ?? "").trim() || null;
  const data_vencimento = String(formData.get("data_vencimento") ?? "") || null;
  const prioridade = formData.get("prioridade") ? Number(formData.get("prioridade")) : null;

  if (!titulo) throw new Error("Título obrigatório");

  const { error } = await supabase.from("tarefas").insert({
    titulo,
    descricao,
    data_vencimento,
    prioridade,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/agenda");
  revalidatePath("/agenda/tarefas");
}

export async function toggleTarefa(id: string, concluida: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("tarefas")
    .update({ concluida })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/agenda");
  revalidatePath("/agenda/tarefas");
}

export async function deletarTarefa(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("tarefas").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/agenda");
  revalidatePath("/agenda/tarefas");
}
