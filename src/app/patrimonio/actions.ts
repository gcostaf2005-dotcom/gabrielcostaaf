"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function criarPatrimonio(formData: FormData) {
  const supabase = await createClient();

  const tipo = String(formData.get("tipo")) as "bem" | "experiencia";
  const nome = String(formData.get("nome") ?? "").trim();
  const categoria = String(formData.get("categoria") ?? "").trim() || null;
  const valor = Number(formData.get("valor"));
  const data = String(formData.get("data") ?? "");
  const valor_atual = formData.get("valor_atual") ? Number(formData.get("valor_atual")) : null;
  const notas = String(formData.get("notas") ?? "").trim() || null;

  if (!nome) throw new Error("Nome obrigatório");
  if (!valor || valor <= 0) throw new Error("Valor deve ser maior que zero");

  const { error } = await supabase.from("patrimonio").insert({
    tipo,
    nome,
    categoria,
    valor,
    data: data || new Date().toISOString().slice(0, 10),
    valor_atual,
    notas,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/patrimonio");
  revalidatePath(`/patrimonio/${tipo === "bem" ? "bens" : "experiencias"}`);
}

export async function deletarPatrimonio(id: string, tipo: "bem" | "experiencia") {
  const supabase = await createClient();
  const { error } = await supabase.from("patrimonio").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/patrimonio");
  revalidatePath(`/patrimonio/${tipo === "bem" ? "bens" : "experiencias"}`);
}

export async function criarInvestimento(formData: FormData) {
  const supabase = await createClient();

  const nome = String(formData.get("nome") ?? "").trim();
  const tipo = String(formData.get("tipo")) as
    | "renda_fixa"
    | "tesouro"
    | "acoes"
    | "fii"
    | "cripto"
    | "fundos"
    | "outros";
  const valor_aporte = Number(formData.get("valor_aporte"));
  const data_aporte = String(formData.get("data_aporte") ?? "");
  const valor_atual = formData.get("valor_atual") ? Number(formData.get("valor_atual")) : null;
  const instituicao = String(formData.get("instituicao") ?? "").trim() || null;
  const notas = String(formData.get("notas") ?? "").trim() || null;

  if (!nome) throw new Error("Nome obrigatório");
  if (!valor_aporte || valor_aporte <= 0) throw new Error("Valor de aporte inválido");

  const { error } = await supabase.from("investimentos").insert({
    nome,
    tipo,
    valor_aporte,
    data_aporte: data_aporte || new Date().toISOString().slice(0, 10),
    valor_atual,
    instituicao,
    notas,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/patrimonio");
  revalidatePath("/patrimonio/investimentos");
}

export async function atualizarValorInvestimento(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id"));
  const valor_atual = Number(formData.get("valor_atual"));

  const { error } = await supabase
    .from("investimentos")
    .update({ valor_atual })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/patrimonio");
  revalidatePath("/patrimonio/investimentos");
}

export async function deletarInvestimento(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("investimentos").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/patrimonio");
  revalidatePath("/patrimonio/investimentos");
}
