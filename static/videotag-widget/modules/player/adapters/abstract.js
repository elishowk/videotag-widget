/*global define, _*/

define([
    'backbone',
    'app'
], function (Backbone, App) {
    'use strict';

    return _.extend({
        'timer': null,
        'timeInterval': 100,
        'initialize': function () {
            this.build.apply(this, arguments);
            App.mediator.on('player::seek', function (reference) {
                this.seek(reference);
            }, this);
        },
        'emitCurrentReference': function () {
            this.timer = window.setInterval(function () {
                App.mediator.emit('player::reference::current', ~~this.getCurrentReference());
            }.bind(this), this.timeInterval);
        },
        // should be overriden when extending
        'build': function () {
            throw new Error('not implemented!');
        },
        'play': function () {
            throw new Error('not implemented!');
        },
        'pause': function () {
            throw new Error('not implemented!');
        },
        'seek': function () {
            throw new Error('not implemented!');
        },
        'getCurrentReference': function () {
            throw new Error('not implemented!');
        }
    }, Backbone.Events);
});
