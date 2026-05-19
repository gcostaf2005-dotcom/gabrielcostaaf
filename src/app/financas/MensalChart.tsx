"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

interface DataPoint {
  mes: string;
  entrada: number;
  saida: number;
  saldo: number;
}

interface Props {
  data: DataPoint[];
}

export function MensalChart({ data }: Props) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: -16 }}>
          <CartesianGrid stroke="#262626" strokeDasharray="3 3" />
          <XAxis dataKey="mes" tick={{ fill: "#888", fontSize: 12 }} axisLine={{ stroke: "#262626" }} />
          <YAxis tick={{ fill: "#888", fontSize: 12 }} axisLine={{ stroke: "#262626" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#161616",
              border: "1px solid #262626",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#ededed" }}
            formatter={(value: number) => `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
          />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Bar dataKey="entrada" fill="#10b981" name="Entrada" radius={[4, 4, 0, 0]} />
          <Bar dataKey="saida" fill="#ef4444" name="Saída" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
