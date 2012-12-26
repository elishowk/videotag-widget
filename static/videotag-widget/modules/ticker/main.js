/*global define, _*/

define([
  'backbone',
  'modules/ticker/views/main.js'
], function (Backbone, TickerViewsMain) {
  'use strict';

  var Ticker = function () {};

  _.extend(Ticker.prototype, Backbone.Events, {
    'initialize': function () {
      this.trigger('ready');
    },
    'view': new TickerViewsMain()
  });

  return Ticker;
});
