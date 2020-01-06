#!/usr/bin/env bash

set -e

curl https://raw.githubusercontent.com/OWASP/passfault/master/wordlists/wordlists/10k-worst-passwords.txt > data/tmp.txt
sed -i -e "s/\(.*\)/  '\1',/" data/tmp.txt
echo "module.exports = [" > data/owasp-top-10000.js
cat data/tmp.txt >> data/owasp-top-10000.js
rm data/tmp.txt
echo "];" >> data/owasp-top-10000.js
