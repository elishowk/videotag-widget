/*global define*/

define([
    'backbone',
    'modules/feeds/collections/message'
], function (
    Backbone,
    FeedsCollectionsMessage
) {
    'use strict';

    return Backbone.View.extend({
        'className': 'ticker',
        'tagName': 'div',
        'messages': {},
        'collection': null,
        'initialize': function () {
            this.collection = new FeedsCollectionsMessage();

            if (this.comparator) {
                this.collection.comparator = this.comparator;
            }

            this.collection.on('add', function (messageModel) {
                this.pushMessage(messageModel);
            }, this);
        },
        'hideRight': function () {
            this.$el.addClass('hideRight');
            this.$el.removeClass('hideLeft');

            return this;
        },
        'hideLeft': function () {
            this.$el.addClass('hideLeft');
            this.$el.removeClass('hideRight');

            return this;
        },
        'show': function () {
            this.$el.removeClass('hideRight hideLeft');

            return this;
        },
    });
});
