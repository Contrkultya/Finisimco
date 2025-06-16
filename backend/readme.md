# Finsim simulation CLI

## Backend tech test

Domain-driven simulation CLI game built as a test task for Finsimco

## Whats inside?

- Two simulation modes:
  - **Game 1** – Team 1 enters values, Team 2 approves each
  - **Game 2** – Both teams enter values, output reflects both
- Real-time concurrent terminal usage via shared DB
- Output: `Valuation = EBITDA × Multiple × Factor Score`
- Domain-Driven Design architecture:
  - Clear separation of domain, app logic, and infra
- PostgreSQL-backed with environment-based config

## Running it

1. Add an .env file with DATABASE_URL defining your pgsql connection string
2. install dependencies from requirenments.txt
3. Run it:

   ```bash
   python main.py
   ```

   Run from**two terminals** — one as Team 1 (inputs), one as Team 2 (approvals).

## Architecture

* DDD
* Blueprints and Factory for game creation and entity isolationT

## Trade-offs

1. I decided to not persist any outputs
2. No migrations (alembic can be added with little effort)
3. CLI is synchronous, no real concurrency (not really needed to achieve MVP)
4. No tests

## Contact 

Built with some amount of love by @Contrkultya. Contact me at [kosrobo@gmail.com](mailto:kosrobo@gmail.com) .
