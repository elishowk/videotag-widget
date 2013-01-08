/*global define*/

define([
    'modules/default/views/menu',
], function (DefaultViewsMenu) {
    'use strict';

    return DefaultViewsMenu.extend({
        'className': 'menu',
        'tagName': 'div',
        'history': [],
        'events': {
            'click > .item.session': function (e) {
                if ($(e.target).hasClass('on') === true) {
                    App.session.signout();
                } else {
                    App.session.signin();
                }
            },
            'click > .item.back': function () {
                if (! this.options.back || this.history.length === 0) {
                    return;
                }

                this.history.pop()();

                if (this.history.length === 0) {
                    this.hide('back');
                }
            }
        },
        'initialize': function () {
            if (this.options.back) {
                this.add('back', {
                    'title': 'back', // TODO i18n
                    'className': 'back'
                });
                this.hide('back');
            }
        },
        'render': function () {
            App.mediator.on('user::signin::success', function () {
                this.update('session', {
                    'title': 'sign out', // TODO i18n
                    'className': 'on'
                });
            }, this);

            App.mediator.on('user::signout::success', function () {
                this.update('session', {
                    'title': 'sign in', // TODO i18n
                    'className': '-on'
                });
            }, this);

            this.add('session', {'title': 'sign in'});

            return this;
        }
    });
});
