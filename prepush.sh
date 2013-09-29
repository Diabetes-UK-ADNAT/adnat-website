#!/bin/bash

find . -type f -name "*.js" |xargs grep --color "ConfigIsDev =" > .z
find . -type f -name "config.js" |xargs grep --color "$1" >> .z
find . -type f -name "index.html" |xargs grep --color "token=v$2" >> .z
find . -type f -name "manifest.appcache" |xargs grep --color "token=v$2" >> .z
less .z

