"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface DataPoint {
  data: string;
  dataOriginal: string;
  cargaMax: number;
  repsMax: number;
  volume: number;
}

interface Props {
  data: DataPoint[];
  dataKey: "cargaMax" | "repsMax" | "volume";
  label: string;
}

export function EvolucaoChart({ data, dataKey, label }: Props) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: -16 }}>
          <CartesianGrid stroke="#262626" strokeDasharray="3 3" />
          <XAxis
            dataKey="data"
            tick={{ fill: "#888", fontSize: 12 }}
            axisLine={{ stroke: "#262626" }}
          />
          <YAxis
            tick={{ fill: "#888", fontSize: 12 }}
            axisLine={{ stroke: "#262626" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#161616",
              border: "1px solid #262626",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#ededed" }}
            formatter={(value: number) => [value, label]}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: "#3b82f6", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
