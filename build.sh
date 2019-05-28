#!/bin/bash
set -e

rm -Rf releases
mkdir -p releases

function build {
    npm run build -- -k $1
    for old in build/datasweet_formula-*; do
      new=$(echo $old | sed -E "s/(^build)(\/datasweet_formula-.+)\.zip$/releases\2_kibana-$1.zip/")
      mv -v "$old" "$new"
    done
}

if [ -n "$1" ]; then
  build $1
  exit
fi

build 6.7.1
build 6.7.0
build 6.6.2
build 6.6.1
build 6.6.0
build 6.5.4
build 6.5.3
build 6.5.2
build 6.5.1
build 6.5.0