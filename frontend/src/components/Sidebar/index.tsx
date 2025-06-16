import { useState } from 'react';
import { Modal } from '../Modal';
import { Video } from "lucide-react";
import { BookOpenText } from "lucide-react";

export function Sidebar() {
  const [openModal, setOpenModal] = useState<'video' | 'text' | null>(null);

  const handleClose = () => setOpenModal(null);

  return (
    <aside className="border-r p-1 space-y-3">
      <button
        className="block w-full hover:bg-blue-200 text-blue-600 font-semibold py-2 px-3 rounded"
        onClick={() => setOpenModal('video')}
      >
        <Video className="w-6 h-6" />
      </button>

      <button
        className="block w-full  hover:bg-green-200 text-green-600 font-semibold py-2 px-3 rounded"
        onClick={() => setOpenModal('text')}
      >
        <BookOpenText className="w-6 h-6" />
      </button>

      <Modal
        open={openModal === 'video'}
        onClose={handleClose}
        title="Simulation Walkthrough"
      >
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Demo"
            className="w-full h-64 rounded"
            allowFullScreen
          ></iframe>
        </div>
      </Modal>

      <Modal
        open={openModal === 'text'}
        onClose={handleClose}
        title="Simulation Overview"
      >
        <p>
          In this simulation, teams negotiate key financial terms. Team 1 provides values. Team 2 reviews and approves. Your goal is to finalize all terms with mutual agreement to calculate the final valuation.
        </p>
      </Modal>
    </aside>
  );
}
