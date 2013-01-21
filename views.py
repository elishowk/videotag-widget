# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response
from poser.views import _get_app_context
from django.core.urlresolvers import reverse


def tests(request):
    """
    returns application configuration into the template
    """
    abs_uri = request.build_absolute_uri('/').rstrip('/')
    context = _get_app_context(request)
    context['melomaniacApiUrl'] = '%s%s' % (abs_uri, reverse('api_melomaniacs_top_level', args=['melomaniacs']))
    return render_to_response('videotag-widget/tests.html', context)
