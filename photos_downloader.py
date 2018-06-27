# -*- coding: utf-8 -*- 

# Download all the pictures and save it into the /photos directory.
# This may take a few minutes to complete.

import csv
import os

def main():
	print 'Initializing download...'
	with open("list.csv") as f:
		reader = csv.reader(f)
		content = map(tuple, reader)

	if not os.path.exists("photos"):
		os.makedirs("photos")

	counter = 0;
	total = len(content)

	for item in content:
		name = item[0]
		code = item[1]
		link = "http://biblioteca.utfpr.edu.br/pergamum/biblioteca_s/meu_pergamum/getImg.php?cod_pessoa=" + code
		os.system("wget -q " + link + " -O photos/" + code)
		counter += 1;
		print("Downloading file " + str(counter) + " of " + str(total))

	os.system("rm wget-log*")

if __name__ == '__main__':
	main()
