/*global define, _*/

define([
  'backbone',
  'modules/player/views/main'
], function (Backbone, PlayerViewsMain) {
  'use strict';

  return _.extend({
    'initialize': function () {
      this.build.apply(this, arguments);
    },
    // should be overriden
    'build': function () {},
    'play': function () {},
    'pause': function () {},
    'seek': function () {},
    'getCurrentTime': function () {}
  }, Backbone.Events);
});
