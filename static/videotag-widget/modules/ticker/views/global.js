/*global define*/

define([
    'modules/ticker/views/abstract',
    'modules/ticker/views/badge',
    'videotag/tools/sort',
], function (
    TickerViewsAbstract,
    TickerViewsBadge,
    Sort
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
                this.badges[userId].render();
                this.$el.append(this.badges[userId].$el);
            }
            //this.sort();
            return this;
        },
        'sort': function () {
            var messages = App.dataMap.messages.filter(function (model) {
                var reference = model.get('reference');
                return reference >= (App.currentReference - App.timeRange) && reference <= App.currentReference;
            });
            var usersOrder = Sort.by_relative_createdAt_likes(messages);
            _.each(usersOrder, function(userId) {
                if (this.badges[userId] !== undefined) {
                    this.$el.append(this.badges[userId].$el);
                }
            }, this);

            return this;
        },
        'removeMessage': function (messageModel) {
            var badgeView = this.badges[userId];

            if (! badgeView) {
                return this;
            }

            badgeView.render();
        }
    });
});
