#!/bin/sh

set -e

pnpm run build

cd ../dist/vue-amap
npm publish --tag=1.0 --access public
cd -

echo "Publish completed"
