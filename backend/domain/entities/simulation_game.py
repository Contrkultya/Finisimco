from typing import List
from .input_term import InputTerm
from .output_term import OutputTerm
from .team import Team
from ..services.game_rules import GameRules

class SimulationGame:
    def __init__(self, game_id, mode: int, terms: List[InputTerm], teams: List[Team]):
        self.id = game_id
        self.mode = mode
        self.terms = terms
        self.teams = teams
        self.outputs: List[OutputTerm] = []

    def get_term(self, name: str) -> InputTerm:
        for term in self.terms:
            if term.name == name:
                return term
        raise ValueError(f"Term '{name}' not found.")

    def update_term(self, name: str, value):
        term = self.get_term(name)
        term.set_value(value)
        term.reset_approval()
        self.recalculate_outputs()

    def recalculate_outputs(self):
        self.outputs = GameRules.calculate(self.terms)

    def is_complete(self) -> bool:
        return all(term.approved for term in self.terms)