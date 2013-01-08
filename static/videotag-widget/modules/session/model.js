/*global define*/

define(['backbone'], function (Backbone) {
    'use strict';

    return Backbone.Model.extend({
        // TODO set true after plug of auth
        'valid': false,
        'initialize': function () {
            // TODO get the real user data
            this.set('userId', window.userId || 123);
            this.on('destroy', function () {
                this.valid = false;
            }, this);
        },
        'isValid': function () {
            return this.valid;
        },
        'signup': function () {
            window.open(
                '/account/signup/?next=/account/login?next=/callback.html?param=user::signup::success',
                'window_signup',
                'width=640,height=480,left=' + ((window.screen.availWidth - 640) / 2) + ',top=' + ((window.screen.availHeight - 480) / 2)
            );
            var onMessage = function (e) {
                if (e.origin !== window.location.origin) {
                    return;
                }
                window.removeEventListener('message', onMessage);

                this.valid = false;

                App.mediator.emit('user::signin::success');
            }.bind(this);

            window.addEventListener('message', onMessage, true);
        },
        'signin': function () {
            window.open(
                '/account/login/?next=/callback.html?param=user::signin::success',
                'window_signin',
                'width=640,height=480,left=' + ((window.screen.availWidth - 640) / 2) + ',top=' + ((window.screen.availHeight - 480) / 2)
            );
            var onMessage = function (e) {
                if (e.origin !== window.location.origin) {
                    return;
                }
                window.removeEventListener('message', onMessage);

                this.valid = true;

                App.mediator.emit('user::signin::success');
            }.bind(this);

            window.addEventListener('message', onMessage, true);
        },
        'signout': function () {
            window.open(
                '/account/logout/?next=/callback.html?param=user::signout::success',
                'window_signout',
                'width=640,height=480,left=' + ((window.screen.availWidth - 640) / 2) + ',top=' + ((window.screen.availHeight - 480) / 2)
            );
            var onMessage = function (e) {
                if (e.origin !== window.location.origin) {
                    return;
                }
                window.removeEventListener('message', onMessage);

                this.valid = false;

                App.mediator.emit('user::signout::success');
            }.bind(this);

            window.addEventListener('message', onMessage, true);
        }
    });
});
