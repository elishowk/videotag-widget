/*global define*/

define(['backbone'], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
        'initialize': function () {
            this.build.apply(this, arguments);
        },
        'parse': function (response) {
            // TODO parse metadata
            return response;
        },
        // should be overriden when extended
        'build': function () {}
    });
});
