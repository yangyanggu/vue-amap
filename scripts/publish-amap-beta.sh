#!/bin/sh

set -e
pnpm run build:amap

cd ../src/vue-amap/dist
npm publish --tag=beta --access public
cd -

echo "Publish completed"
