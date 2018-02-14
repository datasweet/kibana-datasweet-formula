#!/bin/bash

rm -Rf bin

BASEDIR=$PWD
PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F= "{ print $2 }" | sed 's/[version:,\",]//g' | tr -d '[[:space:]]')
PID_ES=""
PID_KBN=""

function stop {
    if [ -n "${PID_ES}" ]; then
        kill $PID_ES
        PID_ES=""
    fi

    if [ -n "${PID_KBN}" ]; then
        kill $PID_KBN
        PID_KBN=""
    fi
}

function test {
  echo "VERSION $1"

  stop

  mkdir -p bin/elasticsearch-$1/
  pushd bin/elasticsearch-$1

  echo "  => Downloading elasticsearch"
  curl -Ls https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-$1.tar.gz | tar zx --strip-components=1

  echo "  => Launching elasticsearch"
  ./bin/elasticsearch &
  PID_ES=$!
  popd

  mkdir -p bin/kibana-$1/
  pushd bin/kibana-$1
  echo "  => Downloading kibana"
  # curl -Ls https://artifacts.elastic.co/downloads/kibana/kibana-$1-linux-x86_64.tar.gz | tar zx --strip-components=1
  curl -Ls https://artifacts.elastic.co/downloads/kibana/kibana-$1-darwin-x86_64.tar.gz | tar zx --strip-components=1

  echo "  => Installing plugin"
  ./bin/kibana-plugin install file://$BASEDIR/releases/datasweet_formula-${PACKAGE_VERSION}_kibana-$1.zip
  
  echo "  => Launching kibana"
  ./bin/kibana &
  PID_KBN=$!
  popd

  echo "  => Loading sample datas"
  curl -H 'Content-Type: application/json' -XPUT 'localhost:9200/shakespeare' --data-binary @tests/mapping.json
  curl -H 'Content-Type: application/x-ndjson' -XPOST 'localhost:9200/shakespeare/doc/_bulk?pretty' --data-binary @tests/shakespeare.json

  IPID=`curl -s -H 'Content-Type: application/json' -H 'kbn-name: kibana' -H "kbn-version: $1" -XPOST 'localhost:5601/api/saved_objects/index-pattern' --data-binary @tests/index-pattern-1.json | jq .id | tr -d '"'`
  curl -H 'Content-Type: application/json' -H 'kbn-name: kibana' -H "kbn-version: $1" -XPOST 'localhost:5601/api/kibana/settings/defaultIndex' --data `printf '{"value":"%s"}' $IPID`
  curl -H 'Content-Type: application/json' -H 'kbn-name: kibana' -H "kbn-version: $1" -XPUT "localhost:5601/api/saved_objects/index-pattern/$IPID" --data-binary @tests/index-pattern-2.json

  VIZ=$(cat tests/viz.json)
  VIZ=`echo ${VIZ/formula-index-pattern/$IPID}`
  VIZ=`echo ${VIZ//formula-kbn-version/v$1}`
  IDVIZ=`curl -H 'Content-Type: application/json' -H 'kbn-name: kibana' -H "kbn-version: $1" -XPOST 'localhost:5601/api/saved_objects/visualization?overwrite=true' --data "$VIZ" | jq .id | tr -d '"'`

  # Only mac...
  open "http://localhost:5601/app/kibana#/visualize/edit/$IDVIZ"
  sleep 15
  screencapture -x releases/datasweet_formula-${PACKAGE_VERSION}_kibana-$1.jpg
}


test 6.2.1
test 6.2.0

test 6.1.3
test 6.1.2
test 6.1.1
test 6.1.0

test 6.0.1
test 6.0.0

test 5.6.7
test 5.6.6
test 5.6.5
test 5.6.4
test 5.6.3
test 5.6.2
test 5.6.1
test 5.6.0

test 5.5.3
test 5.5.2
test 5.5.1
test 5.5.0

# test $1
stop
echo "Done !\n"