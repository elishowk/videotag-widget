/*global define, _*/

define([
    'app',
    'backbone',
    'feeds/feeds',
], function (
    App,
    Backbone,
    feeds
) {
    'use strict';

    var Feeds = function () {};
    var poserFeeds = feeds(require.appConfig.sockjsUrl);

    _.extend(Feeds.prototype, Backbone.Events, {
        'feeds': {},
        'initialize': function () {
            poserFeeds.initialize(function () {
                this.feeds.messages = poserFeeds.feed(require.appConfig.feedId);
                this.feeds.messages.on('join', function () {
                    App.dataMap.messages.fetch({
                        'update': true,
                        'success': function () {
                            this.trigger('ready');
                        }.bind(this)
                    });
                }.bind(this));
                this.feeds.messages.on('message.self', function (data) {
                    App.dataMap.messages.addById(data.id);
                });
                this.feeds.messages.join();
            }.bind(this));
        },
    });
    return Feeds;
});
