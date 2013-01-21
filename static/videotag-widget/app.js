/*global define, _*/

define([
    'backbone',
    'mediator/main',
], function (
    Backbone,
    Mediator
) {
    'use strict';

    // TODO get from conf
    require.appConfig.feedId = 'widget-1';

    var App = _.extend({
        'currentReference': 0,
        'initialize': function () {
            require([
                'modules/ticker/main',
                'modules/player/main',
                'modules/default/views/main',
                'modules/default/views/main-menu',
                'modules/feeds/main',
                'modules/session/main',
                'modules/data/map'
            ], function (
                Ticker,
                PlayerFactory,
                DefaultViewsMain,
                DefaultViewsMainMenu,
                Feeds,
                SessionMain,
                DataMap
            ) {
                var loaded = 0;

                /**
                 * Mediator
                 */
                this.mediator = new Mediator();

                /**
                 * Global views
                 */
                this.view = DefaultViewsMain;
                this.menu = new DefaultViewsMainMenu({'back': true});

                /**
                 * Data Mapping
                 */
                this.dataMap = new DataMap();
                this.dataMap.initialize();

                /**
                 * Modules
                 */
                this.session = new SessionMain();
                this.ticker = new Ticker();
                this.player = new (PlayerFactory.getPlayer())();
                this.feeds = new Feeds();

                this.on('moduleLoaded', function (moduleName) {
                    loaded += 1;

                    console.log('MODULE `' + moduleName + '` LOADED');

                    if (loaded === 4) {
                        this.off('moduleLoaded');
                        this.trigger('ready');
                    }
                }, this);

                this.session.on('ready', function () {
                    this.trigger('moduleLoaded', 'session');
                }, this);
                this.session.initialize();

                this.feeds.once('ready', function () {
                    this.trigger('moduleLoaded', 'feeds');
                }, this);

                this.player.once('ready', function () {
                    this.view.render(this.player.view, 'left');
                    this.trigger('moduleLoaded', 'player');
                }, this);
                App.mediator.on('player::currentReference', function (reference) {
                    this.currentReference = reference;
                }, this);
                // TODO created_by conf
                this.player.initialize('K--8I5TzEOo');

                this.ticker.once('ready', function () {
                    this.view.render(this.ticker.view, 'right');

                    this.feeds.initialize();

                    this.trigger('moduleLoaded', 'ticker');
                }, this);
                this.ticker.initialize();

                this.view.render(this.menu.render(), 'right');

                return this;
            }.bind(this));
        },
        'getCookieObject': function () {
            var arr = [];

            document.cookie.split(';').forEach(function (str) {
                arr.push(str.trim().split('='));
            });

            return _.object(arr);
        },
    }, Backbone.Events);

    // TODO remove global
    window.App = App;

    return App;
});
