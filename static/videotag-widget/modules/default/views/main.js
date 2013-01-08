/*global define*/

define([
    'backbone',
], function (Backbone) {
    'use strict';

    return new (Backbone.View.extend({
        'id': 'main',
        'tagName': 'div',
        'initialize': function () {
            this.$el.append(
                $('<div>').addClass('header'),
                $('<div>').addClass('left'),
                $('<div>').addClass('right')
            );
        },
        'render': function (content, target, empty) {
            if (content instanceof Backbone.View) {
                content = content.$el;
            }

            if (target) {
                target = this.$el.children('.' + target);
            } else {
                target = this.$el;
            }

            if (empty) {
                target.empty();
            }

            target.append(content);

            return this;
        },
    }))();
});
