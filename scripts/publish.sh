#!/bin/sh

set -e

pnpm run build

cd ../dist/vue-amap
npm publish --tag=legacy-vue3 --access public
cd -

echo "Publish completed"
