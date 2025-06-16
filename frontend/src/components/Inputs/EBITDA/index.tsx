import { Input } from "../../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../ui/select";
import { Label } from "../../ui/label";
import { ToggleButton } from "../ToggleButton";
import { useMemo } from "react";
import type { Role } from "../../../features/simulation/types";

type Unit = "K" | "M" | "B";
type Currency = "USD" | "EUR" | "GBP";

type EBITDAFieldProps = {
  value: number;
  unit: Unit;
  currency: Currency;
  role: Role;
  status: "TBD" | "OK";
  onValueChange: (val: number) => void;
  onUnitChange: (unit: Unit) => void;
  onCurrencyChange: (cur: Currency) => void;
  onStatusChange: (status: "TBD" | "OK") => void;
};

function getMultiplier(unit: Unit): number {
  return unit === "K" ? 1_000 : unit === "M" ? 1_000_000 : 1_000_000_000;
}

export function EBITDAField({
  value,
  unit,
  currency,
  status,
  role,
  onValueChange,
  onUnitChange,
  onCurrencyChange,
  onStatusChange,
}: EBITDAFieldProps) {
  const displayValue = useMemo(() => {
    const scaled = value * getMultiplier(unit);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(scaled);
  }, [value, unit, currency]);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseFloat(e.target.value);
    onValueChange(Number.isNaN(parsed) ? 0 : parsed);
  };

  const handleUnitChange = (val: string) => onUnitChange(val as Unit);
  const handleCurrencyChange = (val: string) => onCurrencyChange(val as Currency);
  const handleStatusChange = (val: "TBD" | "OK") => onStatusChange(val);

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex-1">
        <Label className="block mb-1">EBITDA</Label>
        <div className="flex gap-2">
          <Select 
            value={currency} 
            disabled={role !== "team1"}
            onValueChange={handleCurrencyChange}>
            <SelectTrigger className="min-w-[80px]">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-gray-700">
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="number"
            className="min-w-[10px]:"
            disabled={role !== "team1"}
            value={value}
            onChange={handleValueChange}
            placeholder="Amount"
          />

          <Select 
            disabled={role !== "team1"}
            value={unit}
            onValueChange={handleUnitChange}>
            <SelectTrigger className="min-w-[10px]">
              <SelectValue placeholder="Unit" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-gray-700">
              <SelectItem value="K">Thousand</SelectItem>
              <SelectItem value="M">Million</SelectItem>
              <SelectItem value="B">Billion</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="text-xs text-gray-600 mt-1">
          Formatted: <span className="font-mono">{displayValue}</span>
        </div>
      </div>

      <ToggleButton value={status} onChange={handleStatusChange} disabled={role !== "team2"} />
    </div>
  );
}
