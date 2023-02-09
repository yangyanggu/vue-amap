#!/bin/sh

set -e
pnpm run build:util

cd ../src/vue-amap-util
npm publish --tag=beta --access public
cd -

echo "Publish completed"
