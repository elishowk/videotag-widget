/*global define, _*/

define([
    'backbone',
    'mediator/main'
], function (
    Backbone,
    Mediator
) {
    'use strict';
// TODO XSS!
    var App = _.extend({
        'currentReference': 0,
        'initialize': function () {
            require([
                'modules/ticker/main',
                'modules/player/main',
                'modules/default/views/main',
                'modules/default/views/main-menu',
                'modules/feeds/models/message',
                'modules/feeds/collections/message',
                'modules/feeds/main',
                'modules/session/model'
            ], function (
                Ticker,
                PlayerFactory,
                DefaultViewsMain,
                DefaultViewsMainMenu,
                FeedsModelsMessage,
                FeedsCollectionsMessage,
                Feeds,
                SessionModel
            ) {
                var modules = {
                    'mediator': new Mediator(),
                    // TODO retrieve real id /poser/api/user/
                    'session': new SessionModel({'id': 1}),
                    'view': DefaultViewsMain,
                    'ticker': new Ticker(),
                    'player': new (PlayerFactory.getPlayer())(),
                    'menu': new DefaultViewsMainMenu({'back': true}),
                    'feeds': new Feeds,
                };
                var modulesToLoad = 3;

                _.extend(this, modules);

                this.on('moduleLoaded', function () {
                    modulesToLoad -= 1;

                    if (modulesToLoad === 0) {
                        this.off('moduleLoaded');
                        this.trigger('ready');
                    }
                }, this);

                this.session.on('ready', function () {
                    this.trigger('moduleLoaded');
                });
                this.session.fetch({'success': function () {
                    this.trigger('moduleLoaded');
                }.bind(this)});

                this.feeds.once('ready', function () {
                    this.trigger('moduleLoaded');
                }, this);
                this.feeds.initialize();

                this.feeds.messages = new FeedsCollectionsMessage();
                this.feeds.messages.on('add', function (model) {
                    var messageId = model.get('metadata').replyTo;

                    if (messageId) {
                        App.mediator.emit('feeds::message::reply::' + messageId, model, messageId);
                    } else {
                        App.mediator.emit('feeds::message::user::' + model.get('created_by'), model, model.get('created_by'));
                    }
                });
                App.mediator.on('feeds::message::new', function (data) {
                    /**
                     * TODO
                     * remove fake ID and fake user (window.user)
                     * new FeedsModelsMessage
                     * save
                     * within the callback add the model in App.feeds.messages
                     */
                    var attrs = {
                        'reference': data.reference,
                        'username': window.username || 'avetisk',
                        'created_by': window.userId || 123,
                        'created_at': ~~((new Date()).getTime() / 1000),
                        'id': _.uniqueId(),
                        'metadata': {
                            'body': data.body,
                            'like': 0
                        }
                    };

                    if (data.replyTo) {
                        attrs.metadata.replyTo = data.replyTo;
                    }

                    var feedsMessageModel = new FeedsModelsMessage(attrs);

                    this.feeds.messages.add(feedsMessageModel);
                }, this);

                this.player.once('ready', function () {
                    this.view.render(this.player.view, 'left');
                    this.trigger('moduleLoaded');
                }, this);
                App.mediator.on('player::currentReference', function (reference) {
                    this.currentReference = reference;
                }, this);
                // TODO created_by conf
                this.player.initialize('K--8I5TzEOo');

                this.ticker.once('ready', function () {
                    this.view.render(this.ticker.view, 'right');
                    this.trigger('moduleLoaded');
                }, this);
                this.ticker.initialize();

                this.view.render(this.menu.render(), 'right');

                return this;
            }.bind(this));
        },
    }, Backbone.Events);

    // TODO remove global
    window.App = App;

    return App;
});
