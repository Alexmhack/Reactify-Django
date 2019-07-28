from django.contrib import admin
from django.views.generic import TemplateView
from django.urls import path, include


urlpatterns = [
    path('', TemplateView.as_view(template_name='react.html')),
    path('admin/', admin.site.urls),
    path('api/posts/', include('posts.urls'))
]
