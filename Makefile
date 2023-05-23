

test-acorn:
	./tests/acorn.js

test-eslint:
	./tests/eslint.js

test-pbrute:
	./tests/pbrute.sh

test-computer-science:
	./tests/computer-science.js

all: test-acorn test-eslint test-pbrute test-computer-science

