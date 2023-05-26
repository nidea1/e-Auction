from django.urls import path, include
from ..views.bid_views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', BidList, basename='bids')
router.register(r'product/(?P<product_id>\d+)', ProductBidList, basename='product')

urlpatterns = [
    path('', include(router.urls)),
]
