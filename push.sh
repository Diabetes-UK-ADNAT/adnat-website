#!/bin/bash

date
echo "Pushing adnat-www "

echo "adnat-www" > app/v/index.html
date +%Y-%m-%d:%H:%M.%S >> app/v/index.html

rsync -v -e "ssh -p 12222 -x -a -l ubu-install-jeos"     \
--include '.htaccess' \
--exclude '.DS_Store'  \
--exclude '.swp' \
-aruzitPL  \
app/ \
67.18.182.74:/var/www/adnat-www

date
