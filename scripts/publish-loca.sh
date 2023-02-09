#!/bin/sh

set -e
pnpm run build:loca

cd ../src/vue-amap-loca
npm publish --access public
cd -

echo "Publish completed"
