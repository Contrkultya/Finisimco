import type { Role } from "../../../features/simulation/types";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { ToggleButton } from "../ToggleButton";
import { useCallback, useMemo, useState } from "react";

type InterestRateFieldProps = {
  value: number;
  status: "TBD" | "OK";
  role: Role;
  onValueChange: (value: number) => void;
  onStatusChange: (status: "TBD" | "OK") => void;
};

export function InterestRateField({ value, status, role, onValueChange, onStatusChange }: InterestRateFieldProps) {
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseFloat(e.target.value);
    if (isNaN(parsed)) {
      setError("Invalid number");
      onValueChange(0);
      return;
    }

    if (parsed < 0 || parsed > 100) {
      setError("Must be between 0 and 100%");
    } else {
      setError(null);
    }

    onValueChange(parsed);
  }, [onValueChange]);

  const handleStatus = useCallback((s: "TBD" | "OK") => {
    onStatusChange(s);
  }, [onStatusChange]);

  const formatted = useMemo(() => `${value}%`, [value]);

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex-1">
        <Label className="block mb-1">Interest Rate</Label>
        <Input
          type="number"
          value={value}
          onChange={handleChange}
          disabled={role !== "team1"}
          min={0}
          max={100}
          className="w-full"
        />
        <div className="text-xs text-gray-600 mt-1">
          Formatted: <span className="font-mono">{formatted}</span>
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>

      <ToggleButton value={status} onChange={handleStatus} disabled={role !== "team2"} />
    </div>
  );
}
