from dataclasses import dataclass

@dataclass
class TermSpec:
    name: str
    team_owner: int | None = None
    default_value: float | None = None

@dataclass
class GameBlueprint:
    mode: int
    term_specs: list[TermSpec]
