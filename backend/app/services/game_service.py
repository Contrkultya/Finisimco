from domain.entities.simulation_game import SimulationGame
from domain.entities.output_term import OutputTerm
from infrastructure.db.sim_repository import SimulationRepository

class GameService:
    def __init__(self, repository: SimulationRepository):
        self.repo = repository

    def load_game(self, game_id: str) -> SimulationGame:
        return self.repo.load_game(game_id)

    def update_input(self, game_id: str, term_name: str, value: float):
        game = self.repo.load_game(game_id)
        game.update_term(term_name, value)
        self.repo.save_game(game)

    def toggle_approval(self, game_id: str, term_name: str):
        game = self.repo.load_game(game_id)
        term = game.get_term(term_name)
        term.toggle_approval()
        self.repo.save_game(game)

    def get_outputs(self, game_id: str) -> list[OutputTerm]:
        game = self.repo.load_game(game_id)
        return game.outputs

    def is_complete(self, game_id: str) -> bool:
        game = self.repo.load_game(game_id)
        return game.is_complete()
