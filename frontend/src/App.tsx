import { useState } from 'react';
import { SimulationPanel } from './components/SimulationPanel';
import { Sidebar } from './components/Sidebar';
import { Users } from "lucide-react";
import type { Role } from './features/simulation/types';

export default function App() {
  const [role, setRole] = useState<Role>('team1');

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value as Role);
  };

  return (
    <div className="flex h-screen text-gray-400">

      <Sidebar />
      <main className="flex flex-col p-6 overflow-y-auto">
        <header className="flex flex-row mb-4 justify-between gap-2">
          <h1 className="text-xl font-bold">Simulation Interface</h1>
          <div className="flex items-center space-x-2">
            <label htmlFor="role" className="text-sm font-medium"><Users></Users></label>
            <select
              id="role"
              value={role}
              onChange={handleRoleChange}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="team1">Team 1 (Input)</option>
              <option value="team2">Team 2 (Approval)</option>
            </select>
          </div>
        </header>

        <SimulationPanel role={role} setRole={setRole} />
      </main>
    </div>
  );
}
