/*global define, _*/

define([
  'backbone',
  'mediator/main',
  'modules/ticker/main',
  'modules/player/main',
  'modules/default/views/main',
  'modules/default/views/menu',
], function (
  Backbone,
  Mediator,
  Ticker,
  PlayerFactory,
  DefaultViewsMain,
  DefaultViewsMenu
) {
  'use strict';

  return _.extend({
    'initialize': function () {
      var modules = {
        'mediator': new Mediator(),
        'view': DefaultViewsMain,
        'ticker': new Ticker(),
        'player': new (PlayerFactory.getPlayer())(),
        'menu': new DefaultViewsMenu()
      };
      var modulesToLoad = 2;

      _.extend(this, modules);

      this.on('moduleLoaded', function () {
        modulesToLoad -= 1;

        if (modulesToLoad === 0) {
          this.trigger('ready');
          window.player = this.player
        }
      }, this);

      this.player.on('ready', function (playerView) {
        this.view.render(this.player.view.render());
        this.trigger('moduleLoaded');
      }, this);
      this.player.initialize();

      this.ticker.on('ready', function (tickerView) {
        this.view.render(this.ticker.view.render());
        this.trigger('moduleLoaded');
      }, this);
      this.ticker.initialize();

      return this;
    },
    'configure': function () {
      // $.ajaxSetup() set CSRF (and API key)
    }
  }, Backbone.Events);
});
