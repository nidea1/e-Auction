from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated

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


class ConfirmedOrderList(ListAPIView):

    permission_classes = [IsAuthenticated]
    serializer_class = ConfirmedOrderSerializer
    
    def get_queryset(self):
        return Order.objects.filter(buyer=self.request.user, isConfirmed = True)
