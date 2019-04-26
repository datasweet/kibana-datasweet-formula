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

build 7.0.0