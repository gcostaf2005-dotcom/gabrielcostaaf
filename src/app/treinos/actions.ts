"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function criarExercicio(formData: FormData) {
  const supabase = await createClient();
  const nome = String(formData.get("nome") ?? "").trim();
  const grupo_muscular = String(formData.get("grupo_muscular") ?? "").trim() || null;
  const notas = String(formData.get("notas") ?? "").trim() || null;

  if (!nome) throw new Error("Nome do exercício é obrigatório");

  const { error } = await supabase.from("exercicios").insert({ nome, grupo_muscular, notas });
  if (error) throw new Error(error.message);

  revalidatePath("/treinos/exercicios");
  revalidatePath("/treinos");
}

export async function deletarExercicio(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("exercicios").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/treinos/exercicios");
}

export async function iniciarSessao(formData: FormData) {
  const supabase = await createClient();
  const notas = String(formData.get("notas") ?? "").trim() || null;

  const { data, error } = await supabase
    .from("sessoes_treino")
    .insert({ notas })
    .select()
    .single();

  if (error) throw new Error(error.message);

  redirect(`/treinos/sessao/${data.id}`);
}

export async function registrarSet(formData: FormData) {
  const supabase = await createClient();
  const sessao_id = String(formData.get("sessao_id"));
  const exercicio_id = String(formData.get("exercicio_id"));
  const numero_set = Number(formData.get("numero_set"));
  const reps = formData.get("reps") ? Number(formData.get("reps")) : null;
  const carga = formData.get("carga") ? Number(formData.get("carga")) : null;
  const rpe = formData.get("rpe") ? Number(formData.get("rpe")) : null;
  const notas = String(formData.get("notas") ?? "").trim() || null;

  const { error } = await supabase.from("sessao_sets").insert({
    sessao_id,
    exercicio_id,
    numero_set,
    reps,
    carga,
    rpe,
    notas,
  });

  if (error) throw new Error(error.message);

  revalidatePath(`/treinos/sessao/${sessao_id}`);
}

export async function deletarSet(id: string, sessao_id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("sessao_sets").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/treinos/sessao/${sessao_id}`);
}

export async function finalizarSessao(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id"));
  const duracao_min = formData.get("duracao_min") ? Number(formData.get("duracao_min")) : null;
  const rpe = formData.get("rpe") ? Number(formData.get("rpe")) : null;
  const notas = String(formData.get("notas") ?? "").trim() || null;

  const { error } = await supabase
    .from("sessoes_treino")
    .update({ duracao_min, rpe, notas })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/treinos");
  revalidatePath("/treinos/historico");
  redirect("/treinos/historico");
}

export async function deletarSessao(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("sessoes_treino").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/treinos/historico");
  revalidatePath("/treinos");
}
