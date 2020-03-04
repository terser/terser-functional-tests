#!/bin/bash

set -e

export TERSER_PATH=${TERSER_PATH:-$(pwd)/../terser}

echo "NEED NODE 12 (probably)"
node -v

set -eo pipefail

function header() {
    echo "


### running $1...
"
}

# Node 12 tests
header acorn.js
./tests/acorn.js

header eslint.js
./tests/eslint.js

header eslint-unit.js
./tests/eslint-unit.js

header pbrute.sh
./tests/pbrute.sh

header react.js
./tests/react.sh

# Node 13 tests (need ESM)
header computer-science.js
./tests/computer-science.js

