TEMPLATES = $$(find . -name "*.tpl")
CONVERTED_TEMPLATES = $(subst .tpl,.tpl.js,$(TEMPLATES))
JS = $$(find app.js config.js modules -name "*.js")

build: clean templates
	@#mkdir build
	@#rm -fr build/*
	@#echo "\033[01;32m[INFO]\033[0m" building...
	@#for file in $(JS); do echo building $$file; cat $$file >> build/build.js; done
	@#mv build/build.js main.js

clean:
	@echo "\033[01;32m[INFO]\033[0m" clean up...
	@rm -vfr build
	@rm -vfr main.js
	@rm -vfr $(CONVERTED_TEMPLATES)

templates: $(wildcard TEMPLATES)
	@echo "\033[01;32m[INFO]\033[0m"' converting .tpl into .tpl.js:'
	@for file in $(TEMPLATES); do echo converting $$file; (printf 'define(function () { return '"'"''; awk '{gsub("'\\\''", "'\\\\\\\''"); printf "%s%s", $$0, "\\n"}' < $$file; printf "';});") > $$file.js; done

.PHONY: build clean templates

