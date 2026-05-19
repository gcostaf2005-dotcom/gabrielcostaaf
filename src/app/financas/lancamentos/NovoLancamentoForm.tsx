"use client";

import { useState } from "react";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { criarLancamento } from "../actions";
import type { CategoriaFinanca, ContaFinanca } from "@/lib/supabase/types";

interface Props {
  categorias: CategoriaFinanca[];
  contas: ContaFinanca[];
}

export function NovoLancamentoForm({ categorias, contas }: Props) {
  const [tipo, setTipo] = useState<"entrada" | "saida">("saida");
  const hoje = new Date().toISOString().slice(0, 10);

  const categoriasFiltradas = categorias.filter((c) => c.tipo === tipo);

  return (
    <form action={criarLancamento} className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setTipo("entrada")}
          className={`p-3 rounded-lg font-medium transition-colors border ${
            tipo === "entrada"
              ? "bg-success/20 border-success text-success"
              : "bg-card border-border text-foreground/60"
          }`}
        >
          Entrada
        </button>
        <button
          type="button"
          onClick={() => setTipo("saida")}
          className={`p-3 rounded-lg font-medium transition-colors border ${
            tipo === "saida"
              ? "bg-danger/20 border-danger text-danger"
              : "bg-card border-border text-foreground/60"
          }`}
        >
          Saída
        </button>
      </div>
      <input type="hidden" name="tipo" value={tipo} />

      <Input
        name="descricao"
        label="Descrição"
        placeholder={tipo === "entrada" ? "Ex: Recebimento Cliente X" : "Ex: Mercado"}
        required
      />

      <div className="grid grid-cols-2 gap-3">
        <Input name="valor" type="number" step="0.01" label="Valor (R$)" placeholder="0,00" required />
        <Input name="data" type="date" label="Data" defaultValue={hoje} />
      </div>

      <Select name="categoria_id" label="Categoria" defaultValue="">
        <option value="">Sem categoria</option>
        {categoriasFiltradas.map((c) => (
          <option key={c.id} value={c.id}>
            {c.icone ? `${c.icone} ` : ""}
            {c.nome}
          </option>
        ))}
      </Select>

      <Select name="conta_id" label="Conta" defaultValue="">
        <option value="">Sem conta</option>
        {contas.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nome}
          </option>
        ))}
      </Select>

      <Textarea name="notas" label="Notas (opcional)" />

      <Button type="submit" className="self-start">
        Registrar
      </Button>
    </form>
  );
}
