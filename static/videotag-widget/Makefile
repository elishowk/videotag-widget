TEMPLATES = $$(find . -name "*.tpl")
CONVERTED_TEMPLATES = $(subst .tpl,.tpl.js,$(TEMPLATES))
JS = $$(find app.js main.js modules -name "*.js" | grep -v '\.tpl\.js')

build: clean install templates css
	@#mkdir build
	@#rm -fr build/*
	@#echo "\033[01;32m[INFO]\033[0m" building...
	@#for file in $(JS); do echo building $$file; cat $$file >> build/build.js; done
	@#mv build/build.js main.js

install:
	@echo "\033[01;32m[INFO]\033[0m" install
	@npm install

clean:
	@echo "\033[01;32m[INFO]\033[0m" clean up
	@rm -vfr build
	@rm -fr node_modules && echo 'removed ‘node_modules/’'
	@rm -vfr css/*.css
	@rm -vfr $(CONVERTED_TEMPLATES)

css: css/*.styl
	@echo "\033[01;32m[INFO]\033[0m"' compiling .styl into .css'
	@./node_modules/stylus/bin/stylus ./css

jshint: $(wildcard JS)
	@jshint --config .jshintrc $(JS)

templates: $(wildcard TEMPLATES)
	@echo "\033[01;32m[INFO]\033[0m"' converting .tpl into .tpl.js:'
	@for file in $(TEMPLATES); do echo converting $$file; (printf 'define(function () { return '"'"''; awk '{gsub("'\\\''", "'\\\\\\\''"); printf "%s%s", $$0, "\\n"}' < $$file; printf "';});") > $$file.js; done

.PHONY: build clean install templates css jshint
