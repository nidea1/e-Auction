from django.urls import path
from ..views.product_views import *

urlpatterns = [
    path('', ProductList.as_view(), name='products',),
    path('<int:pk>/', ProductDetail.as_view(), name='product_detail',),
    path('brands/', BrandList.as_view(), name='brands',),
    path('brands/<int:pk>', BrandDetail.as_view(), name='brand_detail',),
]
