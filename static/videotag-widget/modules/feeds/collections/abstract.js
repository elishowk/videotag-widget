/*global define*/

define(['backbone'], function (Backbone) {
    'use strict';

    return Backbone.Tastypie.Collection.extend({
        'feedId': null,
        'addById': function (id, callback) {
            var model = new this.model({'id': id});
            model.fetch({'success': function () {
                this.add(model);

                if (callback) {
                    callback(model);
                }
            }.bind(this)});
        },
        'removeById': function (id) {
            this.remove(this.getById(id));

            return this;
        }
    });
});
