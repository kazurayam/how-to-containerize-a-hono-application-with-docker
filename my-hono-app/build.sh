#!/bin/bash

# Build the image on Bun
#   -f Dockerfileのパス
#   -t 名前:タグ
docker build -f ./Dockerfile.bun.debug -t my-hono-app:bun .

# Run the container
#   -d detached mode (not foreground mode)
#   -p device port: container port
#   -name identify the container as hono-app
#
docker run -d -p 3000:3000 --name hono-app my-hono-app:bun

# Test it
curl http://localhost:3000
