/*global define*/

define([
    'modules/ticker/views/abstract'
], function (TickerViewsAbstract) {
    'use strict';

    return TickerViewsAbstract.extend({
        'className': 'ticker reply',
        'comparator': function (model) {
            return model.get('reference');
        },
        'pushMessage': function () {
            // TODO milestone 1.1
        },
        'sort': function () {
            // TODO milestone 1.1
        }
    });
});
