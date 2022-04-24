#!/bin/sh

set -e

pnpm run build

cd ../dist/vue-amap
npm publish --tag=beta --access public
cd -

echo "Publish completed"
