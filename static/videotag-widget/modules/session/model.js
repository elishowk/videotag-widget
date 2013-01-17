/*global define*/

define(['videotag/user/model'], function (UserModel) {
    'use strict';

    return UserModel.extend({
        // TODO set true after plug of auth
        'user': null,
        'valid': false,
        'views': {},
        'initialize': function () {
            this.on('destroy', function () {
                this.valid = false;
            }, this);
        },
        'isValid': function () {
            return this.valid;
        },
        'signup': function () {
            App.mediator.emit('user::signin::success');
        },
        'signin': function () {
            if (this.views.signin) {
                return App.view.render(this.views.signin.render().show());
            }

            // TODO move out
            var getCookieObject = function () {
                var arr = [];

                document.cookie.split(';').forEach(function (str) {
                    arr.push(str.trim().split('='));
                });

                return _.object(arr);
            }

            require(['modules/session/views/signin'], function (SessionViewsSignin) {
                var view = new SessionViewsSignin();
                view.on('submit', function (data) {
                    $.ajax({
                        'url': '/account/login/',
                        'type': 'POST',
                        'headers': {
                            'X-CSRFToken': getCookieObject().csrftoken
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
                });

                App.view.render(view.render().show());

                this.views.signin = view;
            }.bind(this));
        },
        'signout': function () {
            App.mediator.emit('user::signout::success');
        }
    });
});
