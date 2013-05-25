#!/bin/bash

date
time find . -type f -name "*.js" |xargs grep "IS_DEV"
date

echo "Look for isDev: true - set to false"
