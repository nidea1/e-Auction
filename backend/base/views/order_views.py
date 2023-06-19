from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated

from ..serializers import BuyingOrderSerializer, BuyingOrderDetailSerializer
from ..models import Order

class BuyingOrderList(ListAPIView):

    permission_classes = [IsAuthenticated]
    serializer_class = BuyingOrderSerializer
    
    def get_queryset(self):
        return Order.objects.filter(buyer=self.request.user, isConfirmed = False)


class BuyingOrderDetail(RetrieveUpdateAPIView):

    permission_classes = [IsAuthenticated]
    serializer_class = BuyingOrderDetailSerializer
    queryset = Order.objects.all()
