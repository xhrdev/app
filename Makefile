SHELL := bash
MAKEFLAGS += --warn-undefined-variables

.DELETE_ON_ERROR:

version = $(shell jq -r '.version' package.json)
.DEFAULT_GOAL := ci
is_ci := $(shell if [ ! -z "$(CODEBUILD_BUILD_ARN)" ] || [ ! -z "$(GITHUB_ACTIONS)" ]; then echo 'true'; else echo 'false'; fi)
is_codebuild := $(shell if [ ! -z "$(CODEBUILD_BUILD_ARN)" ]; then echo 'true'; else echo 'false'; fi)
git_sha := $(shell if [ ! -z "$(CODEBUILD_RESOLVED_SOURCE_VERSION)" ]; then echo "$(CODEBUILD_RESOLVED_SOURCE_VERSION)"; else git rev-parse --short HEAD; fi)
is_release := $(shell if [ "$(GITHUB_WORKFLOW)" == 'release' ]; then echo 'true'; else echo 'false'; fi)

very-clean: clean
	rm -rf dist target node_modules/ package-lock.json
.PHONY: very-clean

clean:
	rm -rf dist out target/lint target/test target/build coverage
.PHONY: clean

install: | target/install
target/install:
ifeq ($(is_ci), true)
	npm ci
else
	npm install
endif
	mkdir -p $(@D) && touch $@
.PHONY: install

lint: | install target/lint
target/lint:
	npm run lint
	npm run knip
	mkdir -p $(@D) && touch $@
.PHONY: lint

build: | install target/build
target/build:
	npm run build
	mkdir -p $(@D) && touch $@
.PHONY: build

test: | build target/test
target/test:
ifeq ($(is_ci), true)
	node --import=./test/support/register.mjs --experimental-test-coverage --test-coverage-exclude='test/**' --test-reporter=spec --test-reporter-destination=stdout --test-reporter=lcov --test-reporter-destination=target/lcov.info --test "test/**/*.test.ts" "test/**/*.test.tsx"
else
	npm test
endif
	npm run cypress
	mkdir -p $(@D) && touch $@
.PHONY: test

# --- ci
ci: | install lint build test
.PHONY: ci
