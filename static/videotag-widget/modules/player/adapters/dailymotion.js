/*global define, _*/

define([
  'modules/player/adapters/abstract',
  'modules/player/views/main',
  'noext!http://api.dmcdn.net/all.js'
], function (PlayerAbstract, PlayerViewsMain) {
  'use strict';

  var player = function () {};

  _.extend(player.prototype, PlayerAbstract, {
    'options': {
      'width': 640,
      'height': 390,
      'params': {
        'api': 1
      }
    },
    'build': function (videoUrl, options) {
      // Need to append to document for YT API to load
      this.options = _.defaults(options || {}, this.options);
      this.view = new PlayerViewsMain({
        'type': 'dailymotion'
      });
      this.view.$el.appendTo(document.body);

      // This function init the player once the SDK is loaded
      window.dmAsyncInit = function()
      {
        // PARAMS is a javascript object containing parameters
        // to pass to the player if any (eg: {autoplay: 1})
        this.player = window.DM.player(this.view.el.getAttribute('id'),
                               {
                               video: this.getVideoId(videoUrl),
                               width: this.options.width,
                               height: this.options.height,
                               params: this.options.params
                               });

        // We can attach some events on the player (using standard DOM events)
        this.player.addEventListener('apiready', _.once(function()
        {
          // origin div is replaced with an ifram with same ID
          this.view.setElement(this.player).render();
          this.trigger('ready');
          this.player.addEventListener('timeupdate', function(e) {
            this._currentTime = e.target.currentTime;
          }.bind(this));
          this.emitCurrentReference();
        }.bind(this)));
      }.bind(this);
    },
    'getVideoId': function(videoUrl) {
      return videoUrl.replace(/[a-zA-Z:\.\/_-]+video\/([a-zA-Z0-9_-]+)/gi, '$1');
    },
    'play': function () {
      this.player.play();

      return this;
    },
    'pause': function () {
      this.player.pause();

      return this;
    },
    'seek': function (reference) {
      this.player.seek(reference);

      return this;
    },
    'getCurrentReference': function () {
      return this._currentTime;
    }
  });

  return player;
});
