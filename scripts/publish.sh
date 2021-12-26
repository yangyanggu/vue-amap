#!/bin/sh

set -e

pnpm run build

cd ../dist/vue-amap
npm publish --tag=next --access public
cd -

echo "Publish completed"
