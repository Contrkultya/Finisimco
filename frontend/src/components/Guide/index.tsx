import { useState, useEffect } from 'react';

type GuideProps = {
  seen: boolean;
  onAcknowledge: () => void;
};

const guideText = `
Welcome to the simulation. In this game, Team 1 inputs negotiation terms and Team 2 responds by approving or rejecting each term.

Valuation is calculated as EBITDA × Multiple × Factor Score.

`.trim();

export function Guide({ seen, onAcknowledge }: GuideProps) {
  const [open, setOpen] = useState(!seen);

  useEffect(() => {
    if (!open && !seen) {
      onAcknowledge();
    }
  }, [open, seen, onAcknowledge]);

  const handleToggle = () => setOpen(prev => !prev);

  return (
    <div className="border rounded shadow p-4">
      <button
        onClick={handleToggle}
        className="text-left font-semibold w-full flex justify-between items-center"
      >
        <span>First Time Guide</span>
        <span>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="mt-2 text-sm text-gray-400 whitespace-pre-wrap">
          {guideText}
        </div>
      )}
    </div>
  );
}
