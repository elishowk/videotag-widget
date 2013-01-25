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
                    this.trigger('ready');
                }.bind(this));
                this.feeds.messages.on('message.self', function (data) {
                    App.mediator.emit('feeds::messages::create::' + data.id, data);
                });
                this.feeds.messages.on('message.self.delete', function (data) {
                    App.mediator.emit('feeds::messages::remove::' + data.id, data);
                });
                this.feeds.messages.on('message.like', function (data) {
                    App.mediator.emit('feeds::messages::like::' + data.parent, data);
                });
                this.feeds.messages.on('message.like.delete', function (data) {
                    App.mediator.emit('feeds::messages::like::' + data.parent, data);
                });
                this.feeds.messages.join();
            }.bind(this));
        },
    });
    return Feeds;
});
