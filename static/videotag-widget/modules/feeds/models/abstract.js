/*global define*/

define(['backbone'], function (Backbone) {
    'use strict';

    return Backbone.Tastypie.Model.extend({
        'parse': function (data) {
            if (! data || ! data['reference']) {
                return data;
            }

            data['reference'] = parseInt(data['reference'], 10);

            return data;
        },
        'setMetadata': function (key, value) {
            var metadata = this.getMetadata();
            metadata[key] = value;

            this.set('metadata', JSON.stringify(metadata));
        },
        'getMetadata': function (key) {
			var metadata = this.get('metadata');

			if (! metadata) {
				return;
			}

            if (key) {
                return JSON.parse(metadata)[key];
            } else {
                return JSON.parse(metadata);
            }
        },
        'unsetMetadata': function (key) {
            var metadata = this.getMetadata();
            delete metadata[key];

            this.set('metadata', JSON.stringify(metadata));
        },
    });
});
