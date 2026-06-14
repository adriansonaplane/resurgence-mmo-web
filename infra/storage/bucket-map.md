# Storage Bucket Map

| Bucket | Purpose | Access |
|---|---|---|
| `gcs-public-assets` | Public website and marketing assets | public/CDN |
| `gcs-private-assets` | Account downloads and private files | signed URLs/service access |
| `gcs-directus-uploads` | Directus media uploads | Directus service account, public reads where published |

Directus media storage is configured for Google Cloud Storage in staging and production.
