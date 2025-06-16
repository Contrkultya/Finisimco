import type { ReactNode } from 'react';
import { CircleX } from 'lucide-react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="rounded shadow-lg w-[90%] max-w-lg p-6  bg-gray-700 items-center">
        <div className='flex flex-row items-center justify-between'>
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            className="text-gray-500 hover:text-white text-lg"
            onClick={onClose}
          >
            <CircleX />
          </button>
        </div>
        <div className="mt-4 text-sm text-gray-400">{children}</div>
      </div>
    </div>
  );
}
