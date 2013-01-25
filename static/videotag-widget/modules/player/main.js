/*global define*/

define(['modules/player/adapters/youtube'], function (player) {
    'use strict';

    return {
        'getPlayer': function () {
            // TODO take option here and build player
            return player;
        }
    };
});
