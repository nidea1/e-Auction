from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend

from ..filters import OrderFilter

from ..serializers import BuyingOrderSerializer, OrderDetailSerializer, ConfirmedOrderSerializer
from ..models import Order


class BuyingOrderList(ListAPIView):

    permission_classes = [IsAuthenticated]
    serializer_class = BuyingOrderSerializer
    
    def get_queryset(self):
        return Order.objects.filter(buyer=self.request.user, isConfirmed = False)


class OrderDetail(RetrieveUpdateAPIView):

    permission_classes = [IsAuthenticated]
    serializer_class = OrderDetailSerializer
    queryset = Order.objects.all()


class BaseConfirmedOrderList(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ConfirmedOrderSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = OrderFilter

class ForBuyerOrderList(BaseConfirmedOrderList):
    
    def get_queryset(self):
        return Order.objects.filter(buyer=self.request.user, isConfirmed = True)
    

class ForSellerOrderList(BaseConfirmedOrderList):
    
    def get_queryset(self):
        return Order.objects.filter(seller=self.request.user, isConfirmed = True)
