from django.urls import path

from ..views.order_views import *


urlpatterns = [
    path('<int:pk>', OrderDetail.as_view()),
    path('buying/', BuyingOrderList.as_view()),
    path('confirmed/', ConfirmedOrderList.as_view()),
]
