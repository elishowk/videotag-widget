/*global define, _*/

define([
    'backbone',
    'modules/session/model'
], function (Backbone, SessionModel) {
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

                return session;
            }

            session = new SessionModel({'id': _.uniqueId('session_')});

            session.on('destroy', function (session) {
                this.sessions[session.get('id')] = null;
            }, this);

            return session;
        },
    };
});
