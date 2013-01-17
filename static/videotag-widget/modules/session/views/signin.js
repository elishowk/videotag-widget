/*global define*/

define([
    'backbone',
    'modules/session/templates/signin.tpl'
], function (Backbone, tpl) {
    'use strict';

    return Backbone.View.extend({
        'tagName': 'div',
        'className': 'popin session signin',
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
        'fail': function () {
            this.$el.find('p.error').addClass('on');

            return this;
        },
        'reset': function () {
            this.$el.find('p.error').removeClass('on');
        }
    });
});
