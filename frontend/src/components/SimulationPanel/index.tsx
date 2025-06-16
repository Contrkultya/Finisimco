import { useEffect } from "react";
import { Guide } from "../Guide";
import { Timer } from "../Timer";
import { OutputView } from "../OutputView";
import { PieChartView } from "../PieChartView";
import { useSimulationForm } from "../../features/simulation/form/useSimulationForm";
import { useSimulationStore } from '../../features/simulation/store';
import { CompanyNameField } from "../Inputs/Name";
import { DescriptionField } from "../Inputs/Description";
import { EBITDAField } from "../Inputs/EBITDA";
import { MultipleField } from "../Inputs/Multiple";
import { InterestRateField } from "../Inputs/Interest";
import { FactorScoreField } from "../Inputs/Factor";
import type { Role } from "../../features/simulation/types";
import { Button } from "../ui/button";


export function SimulationPanel({ role, setRole }: { role: Role, setRole: (role: Role) => void }) {
  const form = useSimulationForm();
  const [state, dispatch] = useSimulationStore([]);

  const scaledEbitda =
    form.ebitda * (form.ebitdaUnit === "K"
      ? 1_000
      : form.ebitdaUnit === "M"
        ? 1_000_000
        : 1_000_000_000);

  const valuation = scaledEbitda * form.multiple * form.factorScore;

  useEffect(() => {
    const interval = setInterval(() => dispatch({ type: 'tick_timer' }), 1000);
    return () => clearInterval(interval);
  }, [dispatch]);
  
  return (
    <div className="space-y-4 md:space-y-6 h-full overflow-hidden flex flex-col">
      <Guide seen={false} onAcknowledge={() => { }} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
        <div className="min-h-0 overflow-auto flex flex-col gap-4">
          <div className="border rounded-xl shadow-md p-6 bg-card">
            <h2 className="text-xl font-semibold mb-2">Financial Details</h2>
            <EBITDAField
              value={form.ebitda}
              unit={form.ebitdaUnit}
              currency={form.currency}
              status={form.ebitdaStatus}
              role={role}
              onValueChange={form.setEbitda}
              onUnitChange={form.setEbitdaUnit}
              onCurrencyChange={form.setCurrency}
              onStatusChange={form.setEbitdaStatus}
            />
            <MultipleField
              value={form.multiple}
              role={role}
              status={form.multipleStatus}
              onValueChange={form.setMultiple}
              onStatusChange={form.setMultipleStatus}
            />
            <InterestRateField
              value={form.interestRate}
              role={role}
              status={form.interestStatus}
              onValueChange={form.setInterestRate}
              onStatusChange={form.setInterestStatus}
            />
            <FactorScoreField
              value={form.factorScore}
              role={role}
              status={form.factorStatus}
              onValueChange={form.setFactorScore}
              onStatusChange={form.setFactorStatus}
            />
          </div>

          <div className="border rounded-xl shadow-md p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold mb-2">Company Details</h2>
            <CompanyNameField
              value={form.companyName}
              role={role}
              status={form.companyNameStatus}
              onChange={form.setCompanyName}
              onStatusChange={form.setCompanyNameStatus}
            />
            <DescriptionField
              value={form.description}
              role={role}
              status={form.descriptionStatus}
              onChange={form.setDescription}
              onStatusChange={form.setDescriptionStatus}
            />
          </div>
        </div>

        {/* Right: Output */}
        <div className="min-h-0 overflow-auto flex flex-col gap-4">
          <Timer seconds={state.timer} />
          <OutputView
            valuation={valuation}
            factorScore={form.factorScore}
            currency={form.currency}
          />
          <PieChartView interestRate={form.interestRate} />
          <Button
            variant="default"
            className=" font-mono rounded-full border-4 border-yellow-600 text-yellow-600 bg-yellow-950 w-full py-5 text-base font-semibold mt-2 transition-all"
            onClick={() => setRole(role === "team1" ? "team2" : "team1")}
          >
            {role === "team1" ? "Submit Inputs" : "Approve Terms"}
          </Button>
        </div>
      </div>
    </div>
  );
}