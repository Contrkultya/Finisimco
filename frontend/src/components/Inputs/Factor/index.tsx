import { Label } from "../..//ui/label";
import { Slider } from "../../ui/slider";
import { ToggleButton } from "../ToggleButton";

export function FactorScoreField({
  value,
  role,
  status,
  onValueChange,
  onStatusChange
}: {
  value: number;
  role: 'team1' | 'team2';
  status: 'TBD' | 'OK';
  onValueChange: (val: number) => void;
  onStatusChange: (val: 'TBD' | 'OK') => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex-1">
        <Label className="block mb-1 ">Factor Score</Label>
        <Slider
          className="my-4"
          min={1}
          max={5}
          step={1}
          disabled={role !== "team1"}
          value={[value]}
          onValueChange={(vals) => onValueChange(vals[0])}
        />
        <div className="flex justify-between text-xs text-gray-500 px-1 mt-1">
          {[1, 2, 3, 4, 5].map((v) => <span key={v}>{v}</span>)}
        </div>
      </div>
      <ToggleButton value={status} onChange={onStatusChange} disabled={role !== "team2"} />
    </div>
  );
}
