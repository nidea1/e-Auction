from django.urls import path
from ..views.address_views import *

urlpatterns = [
    path('', UserAddressesList.as_view(), name='user_adresses'),
    path('<int:pk>/', UserAddressDetail.as_view(), name='user_adress_detail'),
]
