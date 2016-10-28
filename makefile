BIN=node_modules/.bin
DEPLOY_TARGET = `cat target.txt`
BUILD_DIR=./

SRC_DIR=site
TARGET_DIR=assets

JS_SRC=$(SRC_DIR)/js
JS_BUNDLE=$(TARGET_DIR)/js
BROWSERIFY_DEPS=$(wildcard $(JS_SRC)/main.js $(JS_SRC)/*.js $(JS_SRC)/**/*.js)

SASS_DIR=$(SRC_DIR)/scss
CSS_DIR=$(TARGET_DIR)/css
SASS_DEPS=$(wildcard $(SASS_DIR)/styles.scss $(SASS_DIR)/*.scss)

provision:
	@sh install.sh
	@vagrant up

server:
	@vagrant up

install: ./package.json
	@npm install

deploy-develop:
	rsync --verbose --progress -r --exclude=$(BUILD_DIR)/site/accounts $(BUILD_DIR)/assets $(BUILD_DIR)/site $(DEPLOY_TARGET)

remote-setup:
	rsync --verbose --progress -r $(BUILD_DIR)/panel $(BUILD_DIR)/kirby $(BUILD_DIR)/index.php $(DEPLOY_TARGET)

assets: $(JS_BUNDLE)/bundle.js $(CSS_DIR)/styles.css

develop: $(SRC_DIR)
	@$(BIN)/watch "make assets" $<

$(JS_BUNDLE)/bundle.js: $(BROWSERIFY_DEPS)
	@$(BIN)/browserify $< -o $@

$(CSS_DIR)/styles.css: $(SASS_DEPS)
	@$(BIN)/node-sass $< -o $(CSS_DIR)
	@$(BIN)/postcss --use autoprefixer $@ -o $@
