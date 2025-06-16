import { Clock } from "lucide-react";
const SECONDS_IN_MINUTE = 60;


function formatTime(seconds: number) {
  const m = Math.floor(seconds / SECONDS_IN_MINUTE)
    .toString()
    .padStart(2, "0");
  const s = (seconds % SECONDS_IN_MINUTE).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function Timer({ seconds }: { seconds: number }) {
  const time = formatTime(seconds);

  return (
    <div className="flex justify-center text-sm md:text-base">
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground border-4 border-border shadow-sm">
        <Clock className="w-6 h-6" />
        <span className="font-mono tracking-wide text-xl">
          Elapsed: <span className="font-semibold text-foreground">{time}</span>
        </span>
      </div>
    </div>
  );
}