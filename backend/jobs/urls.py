from django.urls import path

from .views import populate_frontend, search

urlpatterns = [
    path('', populate_frontend, name='populate'),
    path('search/', search, name='search'),
]
