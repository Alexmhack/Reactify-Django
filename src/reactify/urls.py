from django.contrib import admin
from django.views.generic import TemplateView
from django.urls import path, include, re_path


urlpatterns = [
    path('', TemplateView.as_view(template_name='react.html')),
    path('admin/', admin.site.urls),
    re_path(r'^posts/', TemplateView.as_view(template_name='react.html')),
    path('api/posts/', include('posts.urls'))
]
