import uuid
from domain.entities.simulation_game import SimulationGame
from domain.entities.input_term import InputTerm
from domain.entities.team import Team
from .game_blueprint import GameBlueprint

class GameFactory:
    @staticmethod
    def create_game(blueprint: GameBlueprint) -> SimulationGame:
        game_id = str(uuid.uuid4())

        teams = [Team(1, "Team 1"), Team(2, "Team 2")]

        terms = [
            InputTerm(spec.name, value=spec.default_value, team_owner=spec.team_owner)
            for spec in blueprint.term_specs
        ]

        return SimulationGame(
            game_id=game_id,
            mode=blueprint.mode,
            terms=terms,
            teams=teams
        )
