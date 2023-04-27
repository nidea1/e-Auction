from django.urls import path
from ..views.category_views import *

urlpatterns = [
    path('', CategoryList.as_view(), name='categories',),
    path('<int:pk>/', CategoryDetail.as_view(), name='category_detail',),
]
