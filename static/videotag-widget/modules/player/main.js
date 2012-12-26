/*global define*/

// TODO https://github.com/CommOnEcoute/videotag-widget/issues/4
define(['modules/player/adapters/youtube'], function (player) {
  'use strict';

  return {
    'getPlayer': function () {
      return player;
    }
  };
});
