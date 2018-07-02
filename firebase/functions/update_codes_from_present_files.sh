#!/bin/bash

# The name of the file describes what it does.

touch codes.txt
truncate -s 0 codes.txt
ls -L -1 ../public/photos >> codes.txt

echo "Done."
