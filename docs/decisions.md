# Decisions

## Use of AI and assets

PL/JX allowed AI as a learning aid as long as it is recorded. This is that record.

- **Code:** I used an AI coding assistant (Claude Code) to help write and review parts of the frontend, backend, Terraform and workflows, and to debug deploy and load test problems. Every change was read, tested and committed by me.
- **Photo** (`frontend/src/assets/Wilson.jpg`): my own photo.
- **Logo** (`frontend/src/assets/Wanted.png`): [TODO: who made it, and with which tool].
- **Page sound** (`frontend/src/assets/Pages.mp3`): [TODO: source and license].
- **Fonts:** no font files are bundled. The app uses the system font stack (system-ui, Georgia, ui-monospace), so no font license applies.
- **Board design:** papers, pins and strings are drawn with CSS and SVG, no images.

## Technical decisions

| Decision | Why |
| --- | --- |
| Container Apps for the API | Runs the same Docker image as local, with HTTP autoscaling, revisions and probes built in. AKS is too heavy for one API. |
| Static Web Apps for the frontend | The frontend is fully static, and the free tier is enough. |
| PostgreSQL Flexible Server, Burstable B1ms | Managed database at about USD 25 per month, which fits the student credit. No HA, see limitations. |
| Terraform with state in Azure Storage | All resources are in code and can be recreated. The state is shared and locked. |
| azapi next to azurerm | The Container Apps environment was created in Express mode, which cannot read secrets from Key Vault. azapi switches it to WorkloadProfiles. |
| Key Vault with two managed identities | `id-wanted-app` can only read secrets at runtime. `id-wanted-deploy` is only used by the pipeline. Least privilege, and no passwords anywhere. |
| OIDC from GitHub Actions | No Azure secret stored in GitHub. The federated credential uses the numeric repository IDs, so it cannot be reused by a renamed repo. |
| No `terraform apply` in CD | Contributor cannot create role assignments, and giving the pipeline Owner is too much. Infrastructure changes are applied from my laptop. |
| Temporary firewall rule for migrations | The runner IP is allowed only during `migrate deploy` and the seed, and the rule is always removed (`if: always()`). |
| Seed on every deploy | `seed.ts` is the source for the case file content. Comments are not touched by the seed. |
| Pool max 5, 0.5 vCPU, probe timeout 3 s | Based on the k6 results. See [architecture.md](architecture.md). |
| Azure Monitor instead of Prometheus and Grafana | Already integrated with Container Apps, nothing extra to host. |
| Short branches, protected `main` | Every change goes through a pull request with all CI checks required. |
| Deploy only on app changes | Path filter on `backend/`, `frontend/` and the deploy workflow, so docs and Terraform changes do not start a 6 minute deploy. |
| Dependabot skips TypeScript and azurerm major updates | TypeScript 7 breaks `typescript-eslint`, and an azurerm major upgrade needs a planned `terraform plan` check. |

## npm audit

- Frontend: 0 findings.
- Backend: 4 high findings, all from the Prisma CLI dependencies (`deepmerge-ts`, `mysql2`). They only run when the CLI reads its config, not during requests, and the app does not use MySQL. `npm audit fix --force` would downgrade Prisma to 6, so the findings are accepted until Prisma releases a fix.

## Known limitations

| Limitation | How I would fix it |
| --- | --- |
| Single database instance, no HA or geo redundancy | General Purpose tier with zone-redundant HA |
| B1ms connection limit caps how far the API can scale | PgBouncer on Flexible Server or a bigger tier |
| Rate limit is in memory, per replica | Shared store such as Redis |
| Database is reachable from Azure services and my IP | Private access through a VNet |
| Only one environment (prod) | Separate dev or staging environment |
| Dashboard was made in the portal, not in Terraform | Add it to Terraform |
| CD does not run Terraform | Separate infra pipeline with its own identity |
| Key Vault purge protection is off | Turn it on for a long-lived project |
| Request names in Application Insights show only the method (`GET`), not the route | Check OpenTelemetry route support for Express 5 |
| Early commits went straight to `main` before the ruleset existed | Recorded as is |
