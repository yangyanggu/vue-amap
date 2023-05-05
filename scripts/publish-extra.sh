#!/bin/sh

set -e
pnpm run build:extra

cd ../src/vue-amap-extra/dist
npm publish --access public
cd -

echo "Publish completed"
