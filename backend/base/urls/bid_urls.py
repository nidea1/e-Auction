from django.urls import path
from ..views.bid_views import *

urlpatterns = [
    path('', BidList.as_view(), name='user_bids'),
]
