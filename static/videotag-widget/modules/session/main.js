/*global define, _*/

define([
    'modules/session/model'
], function (
    SessionModel,
    SessionViewsSignIn,
    SessionViewsSignUp
) {
    'use strict';

    return {
        'currentSession': null,
        'sessions': {},
        'get': function (id) {
            var session;

            if (id || id === 0) {
                session = this.sessions[id];

                if (! session) {
                    throw new Error('no session (id=`' + id + '`');
                }

                this.currentSession = session;

                return session;
            }

            // TODO retrieve `whoami`
            session = new SessionModel({'id': 1}, {'main': this});

            session.on('destroy', function (session) {
                this.sessions[session.get('id')] = null;
            }, this);

            this.currentSession = session;

            return session;
        },
        'signup': function () {
            App.mediator.emit('user::signin::success');
        },
        'signin': function () {
            App.mediator.emit('user::signin::success');
        },
        'signout': function () {
            App.mediator.emit('user::signout::success');
        }
    };
});
