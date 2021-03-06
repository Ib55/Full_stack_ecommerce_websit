
from django.urls import path, include
from .views import *
from rest_framework import routers

route = routers.DefaultRouter()
route.register('categori', CategoryView, basename='CategoryView')

urlpatterns = [
    path('', include(route.urls)),
    path('product/', ProductView.as_view(), name="product"),
    path('product/<int:id>/', ProductView.as_view(), name='product'),
    path('profile/',ProfileView.as_view(),name='profile'),


]
