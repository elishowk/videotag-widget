/*global define, _*/

define([
    'app',
    'backbone',
    'modules/ticker/views/main',
    'modules/ticker/views/global',
    'modules/ticker/views/user',
    'modules/ticker/views/reply',
], function (
    App,
    Backbone,
    TickerViewsMain,
    TickerViewsGlobal,
    TickerViewsUser,
    TickerViewsReply
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
            this.view.on('message::seek', function (reference) {
                App.mediator.emit('player::seek', reference);
            }, this);
            this.view.on('message::new', function (text, reference) {
                var data = {
                    'text': text,
                    'reference': reference
                };

                App.mediator.emit('feeds::message::new', data);
            }, this);
            this.view.on('ticker::user::show', function (userId) {
                this.globalTicker.hideLeft();
                this.currentTicker = this.getTicker('user', userId).show();
                this.history.push({
                    'show': this.globalTicker,
                    'hide': this.currentTicker,
                });
                App.menu.back(function () {
                    var tickers = this.history.pop();
                    tickers['show'].show();
                    tickers['hide'].hideRight();
                }.bind(this));
            }, this);
            this.view.render();
            this.view.appendTicker(this.globalTicker, true);

            App.mediator.on('player::currentReference', function (reference) {
                this.view.updateReference(reference);
            }, this);
            App.mediator.on('feeds::message::user', function (model, userId) {
                this.globalTicker.collection.add(model);
                this.getTicker('user', userId).collection.add(model);
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
                ticker = new TickerViewsReply({'tickerId': tickerId});
            }

            this.view.appendTicker(ticker);

            this.tickers[tickerId] = ticker;

            return ticker;
        }
    });

    return Ticker;
});
