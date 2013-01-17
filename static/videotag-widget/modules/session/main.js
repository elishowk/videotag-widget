/*global define, _*/

define([
    'app',
    'backbone',
    'videotag/user/model'
], function (App, Backbone, UserModel) {
    'use strict';

    var Session = function () {};

    _.extend(Session.prototype, Backbone.Events, {
        'user': null,
        'valid': false,
        'views': {},
        'initialize': function () {
            this.fetchUser();
        },
        'fetchUser': function () {
            // TODO no valid session (on fail)
            this.user = new UserModel({'id': ''});
            this.user.fetch({
                'success': function () {
                    this.valid = true;
                    this.trigger('ready');
                    App.mediator.emit('user::signin::success');
                }.bind(this),
                'error': function () {
                    this.valid = false;
                    this.trigger('ready');
                }.bind(this)
            });
        },
        'isValid': function () {
            return this.valid;
        },
        'isLogged': function (callbackTrue, callbackFalse) {
            $.ajax({
                'url': '/',
                'type': 'GET',
                'success': function (data) {
                    data = $(data);

                    if (data.find('form[action*="account/login"]').length === 0) {
                        if (callbackTrue) {
                            callbackTrue();
                        }
                    } else {
                        if (callbackFalse) {
                            callbackFalse();
                        }
                    }
                }.bind(this)
            });
        },
        'signup': function () {
            // TODO
            App.mediator.emit('user::signin::success');
        },
        'signin': function () {
            if (this.views.signin) {
                App.view.render(this.views.signin.render());

                window.setImmediate(function () {
                    this.views.signin.show();
                }.bind(this));

                return this;
            }

            require(['modules/session/views/signin'], function (SessionViewsSignin) {
                var view = new SessionViewsSignin();
                view.on('submit', function (data) {
                    $.ajax({
                        'url': '/account/login/',
                        'type': 'POST',
                        'headers': {
                            'X-CSRFToken': App.getCookieObject().csrftoken
                        },
                        'data': data,
                        'success': function (data) {
                            data = $(data);

                            if (data.find('form[action*="account/login"]').length === 0) {
                                // TODO fetch self => /poser/api/user/
                                this.valid = true;

                                view.hide();

                                App.mediator.emit('user::signin::success');
                            } else {
                                view.fail();
                            }
                        }.bind(this)
                    });
                }.bind(this));

                App.view.render(view.render());

                window.setImmediate(function () {
                    view.show();
                });

                this.views.signin = view;
            }.bind(this));
        },
        'signout': function () {
            $.ajax({
                'url': '/account/logout/',
                'type': 'POST',
                'headers': {
                    'X-CSRFToken': App.getCookieObject().csrftoken
                },
                'success': function () {
                    this.valid = false;

                    App.mediator.emit('user::signout::success');
                }.bind(this)
            });
        }
    });

    return Session;
});
