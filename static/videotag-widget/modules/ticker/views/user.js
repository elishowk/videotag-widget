/*global define*/

define([
    'modules/ticker/views/abstract',
    'modules/ticker/views/message',
], function (
    TickerViewsAbstract,
    TickerViewsMessage
) {
    'use strict';

    return TickerViewsAbstract.extend({
        'className': 'ticker user',
        'comparator': function (model) {
            return -parseInt(model.get('reference'), 10);
        },
        'pushMessage': function (messageModel) {
            var messageId = messageModel.get('id');

            var messageView = new TickerViewsMessage({'model': messageModel});
            this.messages[messageId] = messageView.render();

            this.sort();

            return this;
        },
        'sort': function () {
            var models = this.collection.models;

            for (var i = 0, len = models.length; i < len; i += 1) {
                this.$el.append(this.messages[models[i].get('id')].$el);
            }

            return this;
        }
    });
});
