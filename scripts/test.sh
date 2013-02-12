#!/bin/bash

#BASE_DIR=`dirname $0`
BASE_DIR=/Users/elink/Documents/Sandlion/Products/ADNAT/src/www
echo ""
echo "Starting Testacular Server (http://vojtajina.github.com/testacular)"
echo "-------------------------------------------------------------------"
PATH=$PATH:/usr/local/bin #for node to work
/usr/local/bin/testacular start $BASE_DIR/config/testacular.conf.js $*
#/usr/local/bin/testacular run --runner-port 9102

