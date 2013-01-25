/*global define, _*/

define([
    'app',
    'backbone',
    'modules/ticker/views/main',
    'modules/ticker/views/global',
    'modules/ticker/views/user'
], function (
    App,
    Backbone,
    TickerViewsMain,
    TickerViewsGlobal,
    TickerViewsUser
) {
    'use strict';

    var Ticker = function () {};

    _.extend(Ticker.prototype, Backbone.Events, {
        'view': null,
        'tickers': {},
        'currentTicker': null,
        'globalTicker': null,
        'history': [],
        'initialize': function () {
            this.globalTicker = new TickerViewsGlobal();
            this.currentTicker = this.globalTicker;

            this.view = new TickerViewsMain();
            App.mediator.on('user::messages::seek', function (reference) {
                App.mediator.emit('player::seek', reference);
            }, this);
            App.mediator.on('user::messages::create', function (text, reference) {
                // Do *NOT* use Backbone.Collection.create
                var model = new App.dataMap.messages.model({
                    'action': 'message.self',
                    'feed': require.appConfig.feedId,
                    'reference': reference + '',
                    'metadata': JSON.stringify({
                        'text': text + ''
                    })
                });
                model.save();
            });
            this.view.on('ticker::user::show', function (userId) {
                this.globalTicker.hideLeft();
                this.currentTicker = this.getTicker('user', userId).show();
                this.history.push({
                    'show': this.globalTicker,
                    'hide': this.currentTicker,
                });
                App.menu.pushHistory(function () {
                    var tickers = this.history.pop();
                    tickers['show'].show();
                    tickers['hide'].hideRight();
                }.bind(this));
            }, this);
            this.view.render();
            this.view.appendTicker(this.globalTicker, true);

            App.mediator.on('player::reference::current', function (reference) {
                this.view.updateReference(reference);
            }, this);
            App.mediator.on('datamap::messages::create', function (model, userId) {
                this.globalTicker.collection.add(model);
                this.getTicker('user', userId).collection.add(model);
            }, this);
            App.mediator.on('datamap::messages::remove', function (model, userId) {
                this.globalTicker.collection.remove(model);
                this.getTicker('user', userId).collection.remove(model);
            }, this);

            this.trigger('ready');
        },
        'getTicker': function (type, id) {
            var tickerId = id ? (type + id) : type;
            var ticker = this.tickers[tickerId];

            if (ticker) {
                return ticker;
            }

            if (type === 'user') {
                ticker = new TickerViewsUser({'tickerId': tickerId});
            } else {
				// TODO add reply type later
			}

            this.view.appendTicker(ticker);

            this.tickers[tickerId] = ticker;

            return ticker;
        }
    });

    return Ticker;
});
