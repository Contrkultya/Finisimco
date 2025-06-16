from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey
from sqlalchemy.orm import relationship, declarative_base, Mapped, mapped_column

Base = declarative_base()

class GameModel(Base):
    __tablename__ = 'games'

    id: Mapped[str] = mapped_column(primary_key=True)
    mode: Mapped[int]
    terms = relationship("InputTermModel", back_populates="game")
    teams = relationship("TeamModel", back_populates="game")


class InputTermModel(Base):
    __tablename__ = 'input_terms'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    value: Mapped[float | None]
    approved: Mapped[bool]
    team_owner: Mapped[int]
    game_id: Mapped[str] = mapped_column(ForeignKey("games.id"))

    game = relationship("GameModel", back_populates="terms")


class TeamModel(Base):
    __tablename__ = 'teams'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String)
    game_id: Mapped[str] = mapped_column(ForeignKey("games.id"))

    game = relationship("GameModel", back_populates="teams")
