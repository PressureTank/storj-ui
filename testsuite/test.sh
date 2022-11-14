#!/usr/bin/env bash
cd "$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

set -ex

storj-up init

docker compose down -v
docker compose up -d

storj-up health

eval $(storj-up credentials -e)

# start user acceptance tests here

docker compose down
