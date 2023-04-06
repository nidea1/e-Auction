from django.urls import path
from ..views.product_views import *

urlpatterns = [
    path('', getProducts, name='products',),
    path('<str:pk>/', getProduct, name='product',),
]