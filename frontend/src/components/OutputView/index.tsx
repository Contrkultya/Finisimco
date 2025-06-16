import { useMemo } from "react";

type OuputViewProps = {
  valuation: number;
  factorScore: number;
  currency: "USD" | "EUR" | "GBP";
};

export function OutputView({ valuation, currency }: OuputViewProps) {
  const formattedValuation = useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(valuation);
  }, [valuation, currency]);

  return (
    <div className="rounded-xl border-4 bg-card shadow-md p-6 text-center">
      <p className=" font-mono text-xl text-muted-foreground mb-1 tracking-wide uppercase">
        Valuation
      </p>
      <p className="text-3xl font-bold text-green-400 dark:text-green-300">
        {formattedValuation}
      </p>
    </div>
  );
}