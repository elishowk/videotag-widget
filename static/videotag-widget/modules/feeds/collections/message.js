/*global define*/

define([
    'backbone',
    'modules/feeds/models/message'
], function (Backbone, MessageModel) {
    'use strict';

    return Backbone.Collection.extend({
        'model': MessageModel
    });
});
