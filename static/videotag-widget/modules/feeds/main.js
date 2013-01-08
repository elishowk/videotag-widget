/*global define, _*/

define([
    'Backbone',
    'feeds/feeds'
], function (Backbone, feeds) {
    'use strict';

    var Feeds = function () {};
    var poserFeeds = feeds(require.appConfig.sockjsUrl);

    _.extend(Feeds.prototype, Backbone.Events, {
        'feeds': {},
        'initialize': function () {
            var countFeedReady = 1;
            var onFeedReady = function () {
                countFeedReady -= 1;

                if (! countFeedReady) {
                    this.trigger('ready');
                }
            }.bind(this);

            poserFeeds.initialize(function () {
                this.feeds.user = poserFeeds.feed('user');
                this.feeds.user.on('feed.join', onFeedReady);
                this.feeds.user.join();

                this.feeds.message = poserFeeds.feed('message');
                this.feeds.message.on('feed.join', onFeedReady);
                this.feeds.message.join();
            }.bind(this));
        }
    });

    return (new Feeds());
});
