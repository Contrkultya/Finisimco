from typing import List
from domain.entities.input_term import InputTerm
from domain.entities.output_term import OutputTerm

class GameRules:
    @staticmethod
    def calculate(inputs: List[InputTerm]) -> List[OutputTerm]:
        try:
            ebitda = float(GameRules._get_value(inputs, "EBITDA"))
            multiple = float(GameRules._get_value(inputs, "Multiple"))
            factor_score = float(GameRules._get_value(inputs, "Factor Score"))
        except ValueError as e:
            print(f"Missing or invalid input: {e}")
            return []

        valuation = ebitda * multiple * factor_score
        return [
            OutputTerm("Valuation", valuation)
        ]

    @staticmethod
    def _get_value(inputs: List[InputTerm], name: str):
        for term in inputs:
            if term.name == name:
                if term.value is None:
                    raise ValueError(f"{name} is not set.")
                return term.value
        raise ValueError(f"{name} not found in inputs.")
