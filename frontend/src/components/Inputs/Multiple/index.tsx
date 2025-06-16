import type { Role } from "../../../features/simulation/types";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { ToggleButton } from "../ToggleButton";
import { useCallback, useMemo, useState } from "react";

type MultipleFieldProps = {
  value: number;
  status: "TBD" | "OK";
  role: Role;
  onValueChange: (val: number) => void;
  onStatusChange: (status: "TBD" | "OK") => void;
};

export function MultipleField({ value, status, role, onValueChange, onStatusChange }: MultipleFieldProps) {
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseFloat(e.target.value);
    if (isNaN(parsed) || parsed <= 0) {
      setError("Must be a positive number");
      onValueChange(0);
    } else {
      setError(null);
      onValueChange(parsed);
    }
  }, [onValueChange]);

  const handleStatusChange = useCallback((s: "TBD" | "OK") => {
    onStatusChange(s);
  }, [onStatusChange]);

  const formatted = useMemo(() => `${value}×`, [value]);

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex-1">
        <Label className="block mb-1">Multiple</Label>
        <Input
          type="number"
          value={value}
          disabled={role !== "team1"}
          onChange={handleChange}
          min={0}
          className="w-full"
        />
        <div className="text-xs text-gray-600 mt-1">
          Formatted: <span className="font-mono">{formatted}</span>
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>

      <ToggleButton
        value={status}
        onChange={handleStatusChange}
        disabled={role !== "team2"} />
    </div>
  );
}
