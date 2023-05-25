from django.urls import path, include
from ..views.bid_views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', BidList, basename='bids')

urlpatterns = [
    path('', include(router.urls)),
]
