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
            var badgeView;
            var userId = messageModel.get('created_by');

            if (! this.badges[userId]) {
                this.badges[userId] = new TickerViewsBadge();
            }

            badgeView = this.badges[userId];
            badgeView.pushModel(messageModel);

            this.$el.append(badgeView.$el);

            return this;
        }
    });
});
