# WAnted

WAnted is my presentation for the Assistant Development Officer recruitment (AstDev Take Home Case, Odd 2627), built as a web app with a detective board theme. Each sticky note on the board is one case file (1a to 1f). Opening a note brings it to a desk where the full content can be read, and visitors can leave a short comment on each file.

The app itself is also the cloud part of the case: it runs on Microsoft Azure, with the infrastructure written in Terraform and deployed through GitHub Actions.

- Web: https://happy-moss-03ed72e00.4.azurestaticapps.net
- API: https://ca-wanted-api.braveocean-83adaf9f.eastasia.azurecontainerapps.io (try `/api/case-files` or `/health/ready`)

## Case files

| Code | Title |
| --- | --- |
| 1a | Suspect Profile |
| 1b | Evidence |
| 1c | Investigation Plan |
| 1d | New Leads |
| 1e | Cold Case |
| 1f | Verdict |

The content lives in the database and is seeded from `backend/prisma/seed.ts`.

## Stack

| Part | Tools |
| --- | --- |
| Frontend | React 19, Vite, TypeScript, anime.js, react-markdown |
| Backend | Node 22, Express 5, TypeScript, Prisma 7 (PrismaPg adapter), zod, pino, helmet, express-rate-limit |
| Database | PostgreSQL 17 |
| Tests | Vitest, Supertest |
| Cloud | Azure Static Web Apps, Container Apps, Container Registry, PostgreSQL Flexible Server, Key Vault, Log Analytics, Application Insights |
| Infrastructure | Terraform (azurerm, azapi, random), state in Azure Storage |
| CI/CD | GitHub Actions with OIDC login to Azure |
| Other | Docker, k6, Dependabot, gitleaks |

## Architecture in short

The frontend is a static site on Azure Static Web Apps. It calls the API on Azure Container Apps, which reads from PostgreSQL Flexible Server. The API runs 2 replicas at minimum and scales up to 5 on HTTP load. Secrets such as `DATABASE_URL` stay in Key Vault and are read through a managed identity, so no password is stored in the repository or in GitHub. Logs and request telemetry go to Log Analytics and Application Insights, with alerts on 5xx errors and on replica count.

More detail, including the load test results, is in [docs/architecture.md](docs/architecture.md).

## Running locally

Requirements: Docker Desktop. For development mode you also need Node 22.

### With Docker Compose

```bash
cp .env.example .env
docker compose up -d --build
```

Set your own `POSTGRES_PASSWORD` in `.env` first. Compose starts the database, runs the migrations and the seed, then starts the API and the web app.

| Service | URL |
| --- | --- |
| Web | http://localhost:8080 |
| API | http://localhost:3002 |
| PostgreSQL | localhost:5433 |

### Development mode

Start only the database with Docker, then run the API and the web app with hot reload:

```bash
docker compose up -d db

cd backend
cp .env.example .env
npm install
npx prisma migrate dev
npm run db:seed
npm run dev

cd ../frontend
cp .env.example .env
npm install
npm run dev
```

In `backend/.env`, use the same password as in the root `.env`. The API runs on http://localhost:3000 and the web app on http://localhost:5173.

## API

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/health` | Liveness, does not touch the database |
| GET | `/health/ready` | Readiness, runs `SELECT 1` on the database |
| GET | `/api/case-files` | List of case files |
| GET | `/api/case-files/:slug` | One case file with its full body |
| GET | `/api/case-files/:slug/testimonies` | Visible comments for a case file |
| POST | `/api/case-files/:slug/testimonies` | New comment: `name` (max 60) and `message` (max 500), limited to 5 per minute per IP |

## Tests

```bash
cd backend
npm test
```

Unit tests cover the services, and API tests run the Express app through Supertest with the repositories mocked. The frontend is checked with `npm run lint` and `npm run build`.

## CI/CD

- CI (`.github/workflows/ci.yml`) runs on every pull request and on `main`: backend build and tests, frontend lint and build, Docker builds of both images, and `terraform fmt` and `validate`.
- `main` is protected by a ruleset: changes go through a pull request and all CI checks must pass.
- CD (`.github/workflows/deploy.yml`) runs after a merge that touches `backend/`, `frontend/` or the workflow itself. It logs in to Azure with OIDC, builds and pushes the API image tagged with the commit SHA, opens the database firewall for the runner, runs `prisma migrate deploy` and the seed, closes the firewall again, updates the Container App, builds and uploads the frontend, and finishes with a smoke test on `/health/ready`.
- Terraform is applied from my laptop, not from CD. The deploy identity has Contributor only, which cannot create role assignments.
- Dependabot opens monthly update PRs for npm, GitHub Actions and Terraform.

## Project structure

```
backend/     Express API, Prisma schema, migrations, seed, tests, Dockerfile
frontend/    React app (board, desk, comments), Dockerfile
infra/       Terraform for all Azure resources
scripts/     k6 load test
docs/        Architecture notes and decisions
.github/     CI, CD and Dependabot
```

## Documentation

- [docs/architecture.md](docs/architecture.md): request and deploy flow, why Container Apps, scaling and load test results
- [docs/decisions.md](docs/decisions.md): technical decisions, use of AI, asset sources and known limitations
