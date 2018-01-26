from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url
from django.views.generic import TemplateView
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from . import views

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name="index.html"), name='index-page'),
    url(r'^notifications/$', TemplateView.as_view(template_name="notification.html"), name='notification-page')
    # url(r'^edit/$',views.edit,name='edit-page')
]

urlpatterns += staticfiles_urlpatterns()