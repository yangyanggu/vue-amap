#!/bin/sh

set -e
pnpm run build:util

cd ../src/vue-amap-util
npm publish --access public
cd -

echo "Publish completed"
