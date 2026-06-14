# Artifact Registry Repositories

Template only. Create these repositories per environment once GCP project IDs and regions are known.

| Repository | Format | Location | Images |
|---|---|---|---|
| `website` | Docker | `REGION` | `frontend`, `api`, `cms`, `worker` |

Image naming convention:

```text
REGION-docker.pkg.dev/PROJECT_ID/website/frontend:GIT_SHA
REGION-docker.pkg.dev/PROJECT_ID/website/api:GIT_SHA
REGION-docker.pkg.dev/PROJECT_ID/website/cms:GIT_SHA
REGION-docker.pkg.dev/PROJECT_ID/website/worker:GIT_SHA
```

Do not bake secrets into images. Runtime secrets must be injected by Cloud Run from Secret Manager.
