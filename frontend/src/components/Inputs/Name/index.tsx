import type { Role } from "../../../features/simulation/types";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { ToggleButton } from "../ToggleButton";
type CompanyNameFieldProps = {
  value: string;
  role: Role;
  onChange: (val: string) => void;
  status: "TBD" | "OK";
  onStatusChange: (val: "TBD" | "OK") => void;
};

export function CompanyNameField({ value, status, role, onChange, onStatusChange }: CompanyNameFieldProps) {
  const handleStatusChange = (val: "TBD" | "OK") => onStatusChange(val);

  return (
    <div className="flex items-end justify-between gap-2">
      <div className="flex flex-col">
        <Label className="block mb-1">Company Name</Label>
        <Input
          type="text"
          value={value}
          disabled={role !== "team1"}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. FinSimco Group Ltd."
          required
        />
      </div>
      <ToggleButton value={status} onChange={handleStatusChange} disabled={role !== "team2"}/>
    </div>
  );
}
