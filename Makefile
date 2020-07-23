

test-acorn:
	./tests/acorn.js

test-eslint:
	./tests/eslint.js

test-ls-lint:
	./tests/ls-lint.sh

test-pbrute:
	./tests/pbrute.sh

test-react:
	./tests/react.sh

test-computer-science:
	./tests/computer-science.js

all: test-acorn test-eslint test-ls-lint test-pbrute test-react test-computer-science

