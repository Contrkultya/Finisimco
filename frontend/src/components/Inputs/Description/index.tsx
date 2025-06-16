import { Textarea } from "../../ui/textarea";
import { Label } from "../../ui/label";
import { ToggleButton } from "../ToggleButton";
import type { Role } from "../../../features/simulation/types";

type DescriptionFieldProps = {
  value: string;
  role: Role;
  onChange: (val: string) => void;
  status: "TBD" | "OK";
  onStatusChange: (val: "TBD" | "OK") => void;
};

export function DescriptionField({ value, role, status, onChange, onStatusChange }: DescriptionFieldProps) {
  const handleStatusChange = (val: "TBD" | "OK") => onStatusChange(val);

  return (
    <div className="flex items-center justify-between gap-1">
      <div className="w-full">
        <Label className="block mb-1">Company Description</Label>
        <Textarea
          disabled={role !== "team1"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Add a short description"
          rows={4}
          maxLength={500}
        />
        <p className="text-xs text-gray-500 mt-1">
          {value.length}/500 characters
        </p>

      </div>
      <ToggleButton value={status} onChange={handleStatusChange} disabled={role !== "team2"}/>
    </div>
  );
}
