#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "Starting Testacular Server (http://vojtajina.github.com/testacular)"
echo "-------------------------------------------------------------------"
PATH=$PATH:/usr/local/bin #for node to work
/usr/local/bin/testacular start $BASE_DIR/../config/testacular-e2e.conf.js $*
