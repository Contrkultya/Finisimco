import { Button } from "../../../components/ui/button";

type ToggleButtonProps = {
  value: "TBD" | "OK";
  onChange: (newStatus: "TBD" | "OK") => void;
  disabled?: boolean;
};

export function ToggleButton({ value, onChange, disabled = false }: ToggleButtonProps) {
  const statuses: ("TBD" | "OK")[] = ["TBD", "OK"];

  const getVariant = (active: boolean): "outline" | "default" => {
    return active ? "default" : "outline";
  };

  const getColorClasses = (label: "TBD" | "OK", active: boolean): string => {
    if (!active) return "text-muted-foreground border";
    if (label === "TBD") return "bg-yellow-200 text-yellow-800 dark:bg-yellow-300 dark:text-yellow-900 ";
    if (label === "OK") return "bg-green-200 text-green-900 dark:bg-green-300 dark:text-green-900";
    return "";
  };

  return (
    <div className="flex gap-1">
      {statuses.map((label) => {
        const isActive = label === value;
        const baseClasses = getColorClasses(label, isActive);
        return (
          <Button
            key={label}
            variant={getVariant(isActive)}
            size="sm"
            disabled={disabled}
            onClick={() => !disabled && onChange(label)}
            className={`${baseClasses} px-3 py-1 rounded-sm text-xs`}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
}
