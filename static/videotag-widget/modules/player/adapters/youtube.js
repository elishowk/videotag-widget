/*global define, _*/

define([
    'modules/player/adapters/abstract',
    'modules/player/views/main',
    'noext!http://youtube.com/iframe_api'
], function (PlayerAbstract, PlayerViewsMain) {
    'use strict';

    var player = function () {};

    _.extend(player.prototype, PlayerAbstract, {
        'options': {
            'width': 640,
            'height': 390
        },
        'build': function (videoId, options) {
            // Need to append to document for YT API to load
            this.options = _.defaults(options || {}, this.options);
            this.view = new PlayerViewsMain({
                'type': 'youtube'
            });
            this.view.$el.appendTo(document.body);

            window.onYouTubeIframeAPIReady = function () {
                this.player = new window.YT.Player(this.view.el, {
                    'width': this.options.width,
                    'height': this.options.height,
                    'videoId': videoId,
                    'events': {
                        'onReady': _.once(function (data) {
                            this.view.setElement(data.target.getIframe()).render();
                            this.trigger('ready');
                        }.bind(this)),
                        'onStateChange': function () {
                            this.emitCurrentReference();
                        }.bind(this)
                    }
                });
            }.bind(this);
        },
        'play': function () {
            this.player.playVideo();

            return this;
        },
        'pause': function () {
            this.player.pauseVideo();

            return this;
        },
        'seek': function (reference) {
            this.player.seekTo(reference);

            return this;
        },
        'getCurrentReference': function () {
            // TODO remove post-debug
            this.player.setVolume(0);
            return this.player.getCurrentTime();
        }
    });

    return player;
});
