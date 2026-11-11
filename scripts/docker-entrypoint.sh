#!/bin/sh
set -e

if [ -f "/app/scripts/sync-catalog.mjs" ]; then
  node /app/scripts/sync-catalog.mjs || true
fi

exec "$@"
