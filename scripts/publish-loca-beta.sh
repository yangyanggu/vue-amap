#!/bin/sh

set -e
pnpm run build:loca

cd ../src/vue-amap-loca/dist
npm publish --tag=beta --access public
cd -

echo "Publish completed"
