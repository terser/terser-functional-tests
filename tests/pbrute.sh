#!/bin/bash

set -exuo pipefail

terser="$TERSER_PATH/bin/terser"

cd pbrute

npm ci

npm run build

cp -r lib lib.bak

function on_exit {
    rm -rf lib
    mv lib.bak lib
}
trap on_exit exit

for file in $(find lib -type f | grep js$); do
    "$terser" "$file" --module -mc > "$file".min
    mv "$file.min" "$file"
done

npm t
npm run integration

