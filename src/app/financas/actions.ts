"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type FormState = { ok?: boolean; error?: string };

export async function criarLancamento(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const supabase = await createClient();

    const data = String(formData.get("data") ?? "");
    const descricao = String(formData.get("descricao") ?? "").trim();
    const valorRaw = formData.get("valor");
    const valor = Number(valorRaw);
    const tipo = String(formData.get("tipo")) as "entrada" | "saida";
    const categoria_id = String(formData.get("categoria_id") ?? "") || null;
    const conta_id = String(formData.get("conta_id") ?? "") || null;
    const notas = String(formData.get("notas") ?? "").trim() || null;

    if (!descricao) return { error: "Descrição obrigatória" };
    if (!valorRaw || isNaN(valor) || valor <= 0)
      return { error: "Valor deve ser maior que zero" };
    if (tipo !== "entrada" && tipo !== "saida")
      return { error: "Tipo inválido (escolha Entrada ou Saída)" };

    const { error } = await supabase.from("lancamentos").insert({
      data: data || new Date().toISOString().slice(0, 10),
      descricao,
      valor,
      tipo,
      categoria_id,
      conta_id,
      notas,
    });

    if (error) return { error: `Banco: ${error.message}` };

    revalidatePath("/financas");
    revalidatePath("/financas/lancamentos");
    return { ok: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Erro desconhecido" };
  }
}

export async function deletarLancamento(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("lancamentos").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/financas");
  revalidatePath("/financas/lancamentos");
}

export async function criarCategoria(formData: FormData) {
  const supabase = await createClient();
  const nome = String(formData.get("nome") ?? "").trim();
  const tipo = String(formData.get("tipo")) as "entrada" | "saida";
  const cor = String(formData.get("cor") ?? "#3B82F6");
  const icone = String(formData.get("icone") ?? "").trim() || null;

  if (!nome) throw new Error("Nome obrigatório");

  const { error } = await supabase.from("categorias_financas").insert({ nome, tipo, cor, icone });
  if (error) throw new Error(error.message);

  revalidatePath("/financas/categorias");
}

export async function deletarCategoria(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("categorias_financas").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/financas/categorias");
}

export async function criarConta(formData: FormData) {
  const supabase = await createClient();
  const nome = String(formData.get("nome") ?? "").trim();
  const tipo = String(formData.get("tipo") ?? "").trim() || null;
  const saldo_inicial = Number(formData.get("saldo_inicial") ?? 0);
  const cor = String(formData.get("cor") ?? "#3B82F6");

  if (!nome) throw new Error("Nome obrigatório");

  const { error } = await supabase.from("contas_financas").insert({
    nome,
    tipo,
    saldo_inicial,
    cor,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/financas/contas");
}

export async function deletarConta(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("contas_financas").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/financas/contas");
}
