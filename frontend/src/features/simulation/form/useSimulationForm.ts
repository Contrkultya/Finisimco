import { useState } from "react";

export type Unit = "K" | "M" | "B";
export type Currency = "USD" | "EUR" | "GBP";
export type Status = "TBD" | "OK";

export function useSimulationForm() {
  const [companyName, setCompanyName] = useState("");
  const [companyNameStatus, setCompanyNameStatus] = useState<Status>("TBD");

  const [description, setDescription] = useState("");
  const [descriptionStatus, setDescriptionStatus] = useState<Status>("TBD");


  const [ebitda, setEbitda] = useState(1);
  const [ebitdaUnit, setEbitdaUnit] = useState<Unit>("M");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [ebitdaStatus, setEbitdaStatus] = useState<Status>("TBD");

  const [multiple, setMultiple] = useState(1);
  const [multipleStatus, setMultipleStatus] = useState<Status>("TBD");

  const [interestRate, setInterestRate] = useState(23);
  const [interestStatus, setInterestStatus] = useState<Status>("TBD");

  const [factorScore, setFactorScore] = useState(1);
  const [factorStatus, setFactorStatus] = useState<Status>("TBD");


  return {
    companyName,
    setCompanyName,
    companyNameStatus,
    setCompanyNameStatus,

    description,
    setDescription,
    descriptionStatus,
    setDescriptionStatus,

    ebitda,
    setEbitda,
    ebitdaUnit,
    setEbitdaUnit,
    currency,
    setCurrency,
    ebitdaStatus,
    setEbitdaStatus,

    multiple,
    setMultiple,
    multipleStatus,
    setMultipleStatus,

    interestRate,
    setInterestRate,
    interestStatus,
    setInterestStatus,

    factorScore,
    setFactorScore,
    factorStatus,
    setFactorStatus
  };
}
