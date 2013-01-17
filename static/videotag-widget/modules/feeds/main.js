/*global define, _*/

define([
    'backbone',
    'feeds/feeds'
], function (Backbone, feeds) {
    'use strict';

    var Feeds = function () {};
    var poserFeeds = feeds(require.appConfig.sockjsUrl);

    _.extend(Feeds.prototype, Backbone.Events, {
        'feeds': {},
        'initialize': function () {
            /**
             * TODO
             *
             * retrieve all
             * fill sort by type (create a collection by 'action')
             * emit 'ready'
             */
            var countFeedReady = 1;
            var onFeedReady = function () {
                countFeedReady -= 1;

                if (! countFeedReady) {
                    this.trigger('ready');
                }
            }.bind(this);

            poserFeeds.initialize(function () {
                // TODO get feed id from conf
                this.feeds.message = poserFeeds.feed('widget');
                this.feeds.message.on('join', onFeedReady);
                this.feeds.message.join();
            }.bind(this));
        }
    });

    return Feeds;
});
