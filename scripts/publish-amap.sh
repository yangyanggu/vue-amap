#!/bin/sh

set -e
pnpm run build:amap

cd ../src/vue-amap/dist
npm publish --access public
cd -

echo "Publish completed"
