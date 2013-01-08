/*global define, _*/

define([
    'backbone',
], function (Backbone) {
    'use strict';

    return Backbone.View.extend({
        'id': _.uniqueId('player_'),
        'tagName': 'div',
        'className': 'player',
        'render': function () {
            this.$el
                .attr({
                    'id': '',
                    'class': ''
                })
                .wrap($('<div>')
                    .attr('id', this.id)
                    .addClass('type-' + this.options.type)
                    .addClass(this.className)
                );
            this.setElement(this.$el.parent());

            return this;
        }
    });
});
