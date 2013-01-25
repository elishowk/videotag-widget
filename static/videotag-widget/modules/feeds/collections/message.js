/*global define*/

define([
    'modules/feeds/collections/abstract',
    'modules/feeds/models/message'
], function (FeedsCollectionsAbstract, MessageModel) {
    'use strict';

    return FeedsCollectionsAbstract.extend({
        'urlRoot': App.config.feedsApiUrl + '/message/',
        'model': MessageModel,
        'initialize': function (models, options) {
            this.filters.action = 'message.self';
            this.filters.feed = options.feedId;
        }
    });
});
