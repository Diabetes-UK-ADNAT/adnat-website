#!/bin/bash
set -e
echo "concat js"
date
rm -f ./js/all.js
for F in `cat ./files-js`
do  
	echo $F
	cat $F  >> ./js/all.js
done
rm -f ./css/all.css
for F in `cat ./files-css`
do  
	echo $F
	cat $F  >> ./css/all.css
done
cp ./js/all.js ./js/allzip.js
gzip -9 ./js/allzip.js
mv ./js/allzip.js.gz ./js/all.js.gz
cp ./css/all.css ./css/allzip.css
gzip -9 ./css/allzip.css
mv ./css/allzip.css.gz ./css/all.css.gz
date

