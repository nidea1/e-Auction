from django.urls import path

from ..views.order_views import *


urlpatterns = [
    path('buying/', BuyingOrderList.as_view()),
]
