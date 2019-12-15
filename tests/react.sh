#!/bin/bash

set -exuo pipefail

(cd react && yarn && yarn test)
