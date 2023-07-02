from django.urls import path
from .views import mapdata

from django.views.generic import TemplateView

urlpatterns = [
    path("", TemplateView.as_view(template_name="map.html")),
    path('mapdata', mapdata, name="mapdata")
]