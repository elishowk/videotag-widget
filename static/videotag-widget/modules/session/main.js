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
        'fetchUser': function (callbackSuccess, callbackError) {
            // TODO no valid session (on fail)
            this.user = new UserModel({'id': ''});
            this.user.fetch({
                'success': function () {
                    this.valid = true;
                    this.trigger('ready');
                    App.mediator.emit('user::signin::success');

                    if (callbackSuccess) {
                        callbackSuccess();
                    }
                }.bind(this),
                'error': function () {
                    this.valid = false;
                    this.trigger('ready');

                    if (callbackError) {
                        callbackError();
                    }
                }.bind(this)
            });
        },
        'isValid': function () {
            return this.valid;
        },
        'signup': function () {
            if (this.isValid()) {
                return this;
            }

            if (this.views.signup) {
                App.view.render(this.views.signin.render());

                window.setImmediate(function () {
                    this.views.signup.show();
                }.bind(this));

                return this;
            }

            require(['modules/session/views/signup'], function (SessionViewsSignup) {
                var view = new SessionViewsSignup();

                view.on('submit', function (data) {
                    $.ajax({
                        'url': '/account/signup/',
                        'type': 'POST',
                        'headers': {
                            'X-CSRFToken': App.getCookieObject().csrftoken
                        },
                        'data': data,
                        'success': function (data) {
                            data = $(data);

                            if (data.find('form[action*="account/signup"]').length === 0) {
                                view.hide();
                                this.fetchUser();
                            } else {
                                data.find('.help-inline').each(function (index, value) {
                                    if (value.getAttribute('id').match('password_confirm')) {
                                        return;
                                    }

                                    var target = value.getAttribute('id').replace(/error_id_(.*)_1/, '$1');

                                    if (value.innerText.match('is required')) {
                                        view.fail(
                                            target,
                                            value.innerText.replace('This field', value.getAttribute('id').replace(/error_id_(.*)_1/, '$1'))
                                        );
                                    } else {
                                        view.fail(
                                            target,
                                            value.innerText
                                        );
                                    }
                                });
                                view.fail();
                            }
                        }.bind(this)
                    });
                }, this);

                App.view.render(view.render());

                window.setImmediate(function () {
                    view.show();
                });

                this.views.signup = view;
            }.bind(this));
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

                view.on('sign-up', function () {
                    this.signup();
                }, this);
                view.on('submit', function (data) {
                    view.reset();

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
                                view.hide();
                                this.fetchUser();
                            } else {
                                if (data.find('.alert.alert-error').text().match('inactive')) {
                                    view.fail('activate');
                                } else {
                                    view.fail('login');
                                }
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
