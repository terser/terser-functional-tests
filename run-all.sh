#!/bin/bash

set -exuo pipefail

export TERSER_PATH=${TERSER_PATH:-$(pwd)/../terser}

for test_script in tests/*; do
    echo "Running ${test_script}"
    "./${test_script}"
done

