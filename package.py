#!/usr/bin/python

import sys
import os
import shutil
import gzip
from string import *
from re import *
from time import *

cssFiles = 'app/files-css'
cssTarget = 'app/css/all.css'
jsFiles = 'app/files-js'
jsTarget = 'app/js/all.js'


def gzFile(plainFile):
	f_in = open(plainFile, 'rb') 
	f_out = gzip.open(plainFile + '.gz', 'wb')
	f_out.writelines(f_in)
	f_out.close()
	f_in.close()

def processFiles(fileList, target):
	print '\nPackaging ' + target + ' using file list in ' + fileList
	files = [line.strip() for line in open(fileList)]
	destination = open(target,'wb')
	for f in files:
		if f.startswith('#'):
			continue
		print f
		shutil.copyfileobj(open(f,'rb'), destination)
	destination.close()
	gzFile(target)


print 'concat js files in ' + jsFiles
print 'concat css files in ' + cssFiles
print 'cssTarget ' + cssTarget
print 'jsTarget ' + jsTarget

processFiles(cssFiles,cssTarget)

processFiles(jsFiles,jsTarget)



