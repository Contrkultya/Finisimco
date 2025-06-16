from domain.entities.simulation_game import SimulationGame
from domain.entities.input_term import InputTerm
from domain.entities.team import Team
from infrastructure.db.models import GameModel, InputTermModel, TeamModel
from sqlalchemy.orm import Session

class SimulationRepository:
    def __init__(self, session: Session):
        self.session = session

    def load_game(self, game_id: str) -> SimulationGame:
        game_row = (
            self.session.query(GameModel)
            .filter(GameModel.id == game_id)
            .first()
        )

        if not game_row:
            raise ValueError(f"Game with ID {game_id} not found.")

        terms = [
            InputTerm(
                name=t.name,
                value=t.value,
                team_owner=t.team_owner,
                approved=t.approved
            )
            for t in game_row.terms
        ]

        teams = [
            Team(team_id=t.id, name=t.name)
            for t in game_row.teams
        ]

        return SimulationGame(
            game_id=game_row.id,
            mode=game_row.mode,
            terms=terms,
            teams=teams
        )

    def save_game(self, game: SimulationGame):

        existing_game = self.session.query(GameModel).filter_by(id=game.id).first()

        if existing_game is None:
            new_game = GameModel(id=game.id, mode=game.mode)
            self.session.add(new_game)

            for team in game.teams:
                team_row = TeamModel(id=team.id, name=team.name, game_id=game.id)
                self.session.add(team_row)

            for term in game.terms:
                term_row = InputTermModel(
                    name=term.name,
                    value=term.value,
                    approved=term.approved,
                    team_owner=term.team_owner,
                    game_id=game.id
                )
                self.session.add(term_row)

        else:
            for term in game.terms:
                term_row = (
                    self.session.query(InputTermModel)
                    .filter_by(name=term.name, game_id=game.id)
                    .first()
                )
                if term_row:
                    term_row.value = term.value
                    term_row.approved = term.approved
                else:
                    self.session.add(InputTermModel(
                        name=term.name,
                        value=term.value,
                        approved=term.approved,
                        team_owner=term.team_owner,
                        game_id=game.id
                    ))

        self.session.commit()
