from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from ..serializers import OrderSerializer
from ..models import Order

class BuyingOrderList(ListAPIView):

    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer
    
    def get_queryset(self):
        return Order.objects.filter(buyer=self.request.user)
