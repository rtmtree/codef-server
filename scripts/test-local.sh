set -e 
set -o pipefail

BASEDIR=$(dirname $0)

echo 'running test in client'

pushd ${BASEDIR}/../io-client
# remove for now (no need to set env for local test)
# sh ../scripts/set-env-vars.sh ../environment/.codef-client.env
yarn lint && yarn test
popd

pushd ${BASEDIR}/../io-server
# remove for now (no need to set env for local test)
# sh ../scripts/set-env-vars.sh ../environment/.codef-server.env
yarn lint && yarn test
popd