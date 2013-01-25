/*global define*/

define([
    'backbone',
    'modules/session/templates/sign-in.tpl'
], function (Backbone, tpl) {
    'use strict';

    return Backbone.View.extend({
        'tagName': 'div',
        'className': 'popin session sign-in',
        'events': {
            'click': function (e) {
                if (e.target !== this.el) {
                    return;
                }

                this.hide();
            },
            'click .sign-up': function () {
                this.trigger('sign-up')
                this.hide();
            },
            'click .submit': function () {
                this.reset();
                this.trigger('submit', {
                    'email': this.$el.find('input.email').val(),
                    'password': this.$el.find('input.password').val()
                });

                return false;
            },
            'keydown input': function (e) {
                if (e.keyCode !== 13 /* ENTER */) {
                    return;
                }
                this.reset();
                this.trigger('submit', {
                    'email': this.$el.find('input.email').val(),
                    'password': this.$el.find('input.password').val()
                });

                return false;
            },
        },
        'render': function () {
            this.$el.html(tpl);

            return this;
        },
        'show': function () {
            this.$el.addClass('on');

            return this;
        },
        'hide': function () {
            this.$el.removeClass('on');

            return this;
        },
        'fail': function (target) {
            target = target ? '.' + target : '';
            this.$el.find('p.error' + target).addClass('on');

            return this;
        },
        'reset': function () {
            this.$el.find('p.error').removeClass('on');
        }
    });
});
