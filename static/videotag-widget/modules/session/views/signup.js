/*global define*/

define([
    'backbone',
    'modules/session/templates/signup.tpl'
], function (Backbone, tpl) {
    return Backbone.View.extend({
        'tagName': 'div',
        'className': 'popin session signin',
        'events': {
            'click .submit': function (e) {
                e.preventDefault();

                this.trigger('submit', {
                    'email': this.$el.find('input.email').val(),
                    'username': this.$el.find('input.username'.val(),
                    'password': this.$el.find('input.password'.val(),
                    'password_confirm': this.$el.find('input.password'.val()
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
        }
    });
});
