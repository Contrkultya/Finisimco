import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

type PieChartViewProps = {
  interestRate: number;
};

const COLORS = ["#22c55e", "#1e293b"];

export function PieChartView({ interestRate }: PieChartViewProps) {
  const data = [
    { name: "Interest", value: 100 - interestRate },
    { name: "Remaining", value: interestRate },
  ];

  const percentLabel = `${Math.round(interestRate)}%`;

  return (
    <div className="rounded-xl border-4 bg-card shadow-md p-6 text-center">

      <div className="w-full h-48">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              outerRadius={80}
              dataKey="value"
              stroke="none"
            >
              <Cell key="filled" fill={COLORS[0]} />
              <Cell key="empty" fill={COLORS[1]} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="relative text-center">
        <span className="text-2xl font-semibold text-green-400 dark:text-green-300">
          {percentLabel}
        </span>
      </div>
    </div>
  );
}
