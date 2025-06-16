from app.services.game_service import GameService
from domain.factories.game_factory import GameFactory
from domain.factories.game_one_blueprint import game_one_blueprint
from domain.factories.game_two_blueprint import game_two_blueprint
from infrastructure.db.sim_repository import SimulationRepository
from infrastructure.db.setup import SessionLocal, init_db

def prompt_choice(label, options):
    print(f"\n{label}")
    for i, opt in enumerate(options, 1):
        print(f"[{i}] {opt}")
    choice = input("> ").strip()
    return int(choice) - 1

def prompt_team_id():
    print("\nChoose your team:")
    print("[1] Team 1 (inputs)")
    print("[2] Team 2 (approvals)")
    return int(input("> ").strip())

def display_game(game):
    print("\n--- Terms ---")
    for t in game.terms:
        print(f"{t.name}: {t.value} [Approved: {'OK' if t.approved else 'TBD'}] (Owner: Team {t.team_owner})")
    print("\n--- Outputs ---")
    for o in game.outputs:
        print(f"{o.name}: {o.value}")
    print("\nGame Complete:", "✅ Yes" if game.is_complete() else "❌ No")

def main():
    init_db()
    session = SessionLocal()
    repo = SimulationRepository(session)
    service = GameService(repo)

    team_id = prompt_team_id()

    action = prompt_choice("Choose:", ["Start New Game (Game 1)", "Start New Game (Game 2)", "Load Existing Game"])

    if action in [0, 1]:  
      blueprint = game_one_blueprint if action == 0 else game_two_blueprint
      game = GameFactory.create_game(blueprint)
      repo.save_game(game)
      game_id = game.id
      print(f"✅ Created game: {game_id}")    
    else:
      game_id = input("Enter existing game ID: ").strip()
    while True:
        game = service.load_game(game_id)

        display_game(game)

        if game.is_complete():
            break
        print("\nWhat would you like to do?")
        if team_id == 1:
            print("[1] Update a term")
        if team_id == 2:
            print("[2] Toggle approval")
        print("[3] Refresh")
        print("[4] Quit")
        choice = input("> ").strip()
        if team_id == 1 and choice == "1":
            name = input("Term name: ").strip()
            value = float(input("New value: "))
            service.update_input(game_id, name, value)
        elif team_id == 2 and choice == "2":
            name = input("Term name: ").strip()
            service.toggle_approval(game_id, name)
        elif choice == "3":
            continue
        elif choice == "4":
            break
        else:
            print("❌ Invalid choice.")

if __name__ == "__main__":
    main()
