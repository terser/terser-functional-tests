#!/usr/bin/env bash

version="$(cat package.json | grep -o 'version....[^\"]\{0,\}' | head -1 | cut -b 12-)"

docker build -t "axgn/pbrute" -t "axgn/pbrute:$version" .
