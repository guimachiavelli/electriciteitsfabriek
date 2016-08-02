DEPLOY_TARGET = `cat target.txt`
BUILD_DIR=./

deploy:
	rsync --verbose --progress -r $(BUILD_DIR)/* $(DEPLOY_TARGET)
