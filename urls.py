# -*- coding: utf-8 -*-
from django.conf.urls.defaults import patterns
from .views import tests


urlpatterns = patterns('',
                       (r'tests.html', tests),
                       )
