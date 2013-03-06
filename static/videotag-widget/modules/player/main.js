/*global define*/

define(function () {
  'use strict';

  return {
    /**
     * list of player provider and their urls tests
     */
    'providers': {
      'youtube': [/youtube/, /youtu\.be/],
      'dailymotion': [/dailymotion/]
    },
    /**
     * Guesses the provider
     */
    'getProvider': function(videoUrl) {
      var provider;
      _.forEach(this.providers, function(urls, name) {
        if(_.contains(_.map(urls, function(url) {
          return url.test(videoUrl);
        }), true)) {
          provider = name;
          return false;
        }
      });
      return provider;
    },
    /**
     * Player adapter factory
     */
    'getPlayer': function (videoUrl, onLoad) {
      require(['modules/player/adapters/' + this.getProvider(videoUrl)], function (player) {
        onLoad(player);
      });
    }
  };
});
