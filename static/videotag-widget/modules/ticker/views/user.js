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
            return -model.get('reference');
        },
        'pushMessage': function (messageModel) {
            var messageId = messageModel.get('id');

            var messageView = new TickerViewsMessage({'model': messageModel});
            this.messages[messageId] = messageView.render();

            this.sort();

            return this;
        },
        'removeMessage': function (messageModel) {
            var messageId = messageModel.get('id');

            if (! this.messages[messageId]) {
                return this;
            }

            this.messages[messageId].remove();
            this.messages[messageId] = null;

            if (! _.some(this.messages)) {
                return App.menu.back();
            }

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
