/*global define*/

define([
    'backbone',
    'modules/session/templates/sign-up.tpl'
], function (Backbone, tpl) {
    'use strict';

    return Backbone.View.extend({
        'tagName': 'div',
        'className': 'popin session sign-up',
        'events': {
            'click': function (e) {
                if (e.target !== this.el) {
                    return;
                }

                this.hide();
            },
            'click .submit': function () {
                this.reset();
                this.trigger('submit', {
                    'username': this.$el.find('input.username').val(),
                    'email': this.$el.find('input.email').val(),
                    'password': this.$el.find('input.password').val(),
                    'password_confirm': this.$el.find('input.password').val()
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
        'fail': function (target, errorMessage) {
            if (! target) {
                return this;
            }

            this.$el.find('p.error.' + target)
                .addClass('on')
                .text(errorMessage);

            return this;
        },
        'reset': function () {
            this.$el.find('p.error').removeClass('on');
        }
    });
});
