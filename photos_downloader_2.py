# -*- coding: utf-8 -*- 

# Download all the pictures and save it into the /output_dir directory.
# The list of IDs is generated using an integer sequence and a verification
# code.

import csv
import os

output_dir = "photos2" # Please make sure this dir exists
num_photos = 10
offset = 1
verbose = 0

def main():
	counter = offset;

	while (counter <= num_photos):
		counter_str = str(counter)
		counter_str_rev = counter_str[::-1]
		mul = 0
		position = 9
		for c in counter_str_rev:
			c_int = int(c)
			mul = mul + (position * c_int)
			position -= 1

		mul = mul % 11
		if mul == 10:
			counter_str = counter_str + "0"
		else:
			counter_str = counter_str + str(mul)

		if verbose == 1:
			print(str(counter) + ": " + counter_str)

		link = "http://biblioteca.utfpr.edu.br/pergamum/biblioteca_s/meu_pergamum/getImg.php?cod_pessoa=" + counter_str
		os.system("wget -q " + link + " -O " + output_dir + "/" + counter_str)
		print("Downloading file " + str(counter) + " of " + str(num_photos) + 
			" (id: " + counter_str + ")")
		counter += 1

	os.system("rm wget-log*")

if __name__ == '__main__':
	main()
