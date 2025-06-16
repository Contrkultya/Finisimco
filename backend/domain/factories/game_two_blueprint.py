from domain.factories.game_blueprint import GameBlueprint, TermSpec

game_two_blueprint = GameBlueprint(
    mode=2,
    term_specs=[
        TermSpec("EBITDA", team_owner=1),
        TermSpec("Multiple", team_owner=1),
        TermSpec("Interest Rate", team_owner=2),
        TermSpec("Factor Score", team_owner=2),
    ],
)
