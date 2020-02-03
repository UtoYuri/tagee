# Tagee
A excellent web project for tagging, browsing, locating your media files.

## Usage
### Run backend service
```bash
./scripts/serve_api.sh
```
### Run frontend service
```bash
./scripts/serve_ui.sh
```
### Run proxy service
```bash
./scripts/serve_proxy.sh
```
### Index media files
```bash
# upsert
./scripts/index_bucket.sh

# recreate
./scripts/index_bucket.sh -f
```