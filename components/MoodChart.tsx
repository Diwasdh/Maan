"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type MoodChartProps = {
  data: Array<{ day: string; score: number }>;
};

export default function MoodChart({ data }: MoodChartProps) {
  return (
    <div className="h-64 w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
