"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { registrarSet } from "../../actions";
import type { Exercicio, SessaoSet } from "@/lib/supabase/types";

interface Props {
  sessaoId: string;
  exercicios: Exercicio[];
  setsExistentes: SessaoSet[];
}

export function SessaoForm({ sessaoId, exercicios, setsExistentes }: Props) {
  const [exercicioId, setExercicioId] = useState("");

  // Contagem de sets por exercício pra sugerir próximo número
  const proximoSet = (exId: string) => {
    const count = setsExistentes.filter((s) => s.exercicio_id === exId).length;
    return count + 1;
  };

  // Sugere carga/reps do último set do mesmo exercício
  const ultimoSet = (exId: string) => {
    const sets = setsExistentes.filter((s) => s.exercicio_id === exId);
    return sets[sets.length - 1];
  };

  const ultimo = exercicioId ? ultimoSet(exercicioId) : null;
  const numero = exercicioId ? proximoSet(exercicioId) : 1;

  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">Registrar set</h2>
      <form action={registrarSet} className="flex flex-col gap-3">
        <input type="hidden" name="sessao_id" value={sessaoId} />
        <input type="hidden" name="numero_set" value={numero} />

        <Select
          name="exercicio_id"
          label="Exercício"
          value={exercicioId}
          onChange={(e) =>
            setExercicioId((e.target as HTMLSelectElement).value)
          }
          required
        >
          <option value="">Selecionar exercício</option>
          {exercicios.map((e) => (
            <option key={e.id} value={e.id}>
              {e.nome} {e.grupo_muscular ? `(${e.grupo_muscular})` : ""}
            </option>
          ))}
        </Select>

        {exercicioId && (
          <div className="text-sm text-foreground/60 -mt-1">
            Set #{numero}
            {ultimo && (
              <>
                {" · Último: "}
                {ultimo.reps ?? "—"} reps
                {ultimo.carga ? ` × ${ultimo.carga}kg` : ""}
                {ultimo.rpe ? ` · RPE ${ultimo.rpe}` : ""}
              </>
            )}
          </div>
        )}

        <div className="grid grid-cols-3 gap-3">
          <Input name="reps" type="number" label="Reps" placeholder="10" />
          <Input
            name="carga"
            type="number"
            step="0.5"
            label="Carga (kg)"
            placeholder="20"
          />
          <Input
            name="rpe"
            type="number"
            min={1}
            max={10}
            label="RPE"
            placeholder="7"
          />
        </div>

        <Input name="notas" label="Notas (opcional)" placeholder="" />

        <Button type="submit" disabled={!exercicioId} className="self-start">
          Registrar
        </Button>
      </form>
    </Card>
  );
}
