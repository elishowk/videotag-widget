/*global define*/

define([
    'modules/ticker/views/abstract',
    'modules/ticker/views/badge',
], function (
    TickerViewsAbstract,
    TickerViewsBadge
) {
    'use strict';

    return TickerViewsAbstract.extend({
        'className': 'ticker global',
        'badges': {},
        'pushMessage': function (messageModel) {
            var userId = messageModel.get('created_by');

            if (! this.badges[userId]) {
                this.badges[userId] = new TickerViewsBadge({
                    'collection': App.ticker.getTicker('user', userId).collection,
                });

                this.$el.append(this.badges[userId].render().$el);
            }

            return this;
        },
    });
});
