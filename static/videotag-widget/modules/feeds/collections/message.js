/*global define*/

define([
    'modules/feeds/collections/abstract',
    'modules/feeds/models/message'
], function (FeedsCollectionsAbstract, MessageModel) {
    'use strict';

    return FeedsCollectionsAbstract.extend({
        'model': MessageModel,
        'initialize': function (models, options) {
            this.filters.feed = options.feedId;
        }
    });
});
