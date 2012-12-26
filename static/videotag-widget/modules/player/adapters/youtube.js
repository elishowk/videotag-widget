/*global define, _*/

define([
  'modules/player/abstract',
  'modules/player/views/main',
  'noext!http://youtube.com/iframe_api'
], function (PlayerAbstract, PlayerViewsMain) {
  'use strict';

  var player = function () {};
  var YT = window.YT;

  _.extend(player.prototype, PlayerAbstract, {
    'build': function () {
      // Need to append to document for YT API to load
      var el = $('<div>')
        .attr('id', _.uniqueId('player_'))
        .appendTo(document.body)

      this.view = new PlayerViewsMain(el, 'youtube');

      window.onYouTubeIframeAPIReady = function () {
        // TODO get from conf
        this.player = new YT.Player(el[0], {
          'height': 390,
          'width': 640,
          'origin': 'http://localhost:9000',
          'videoId': 'K--8I5TzEOo',
          'events': {
            'onReady': function () {
              // TODO DETACH FROM DOM
              this.trigger('ready');
            }.bind(this),
          }
        });
      }.bind(this);
    },
    'play': function () {
      this.player.playVideo();
    },
    'pause': function () {
      this.player.pauseVideo();
    }
  });

  return player;
});
