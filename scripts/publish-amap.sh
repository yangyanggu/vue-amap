#!/bin/sh

set -e
pnpm run build:amap

cd ../src/vue-amap
npm publish --access public
cd -

echo "Publish completed"
