/*global define, _*/

define([
    'backbone',
], function (Backbone) {
    'use strict';

    return Backbone.View.extend({
        'id': 'player' + ~~(Math.random() * 100000),
        'tagName': 'div',
        'render': function () {
            this.$el
                .wrap($('<div>')
                    .attr('id',  _.uniqueId('player_'))
                    .addClass('type-' + this.options.type)
                    .addClass('player')
                );
            this.setElement(this.$el.parent());

            return this;
        }
    });
});
