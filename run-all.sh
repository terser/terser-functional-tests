#!/bin/bash

source ~/.nvm/nvm.sh

# Requires nvm to be installed on the environment. Runs as login shell to load user's login stuff

export TERSER_PATH=${TERSER_PATH:-$(pwd)/../terser}

nvm install 12
nvm install 13
nvm use 12

set -eo pipefail

function header() {
    echo "


### running $1...
"
}

header acorn.js
./tests/acorn.js

header react.js
./tests/react.sh

header eslint.js
./tests/eslint.js

header eslint-unit.js
./tests/eslint-unit.js

header computer-science.js
nvm use 13 ./tests/computer-science.js

