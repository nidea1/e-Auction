from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path("ws/auctions/<int:product_id>/", consumers.BidConsumer.as_asgi()),
]
