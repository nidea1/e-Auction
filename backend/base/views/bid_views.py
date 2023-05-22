from ..serializers import BidSerializer
from ..models import Bid

from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListCreateAPIView
from rest_framework.filters import SearchFilter, OrderingFilter

class BidList(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BidSerializer

    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ['productName']
    ordering_fields = ['createdAt']
    
    def get_queryset(self):
        return Bid.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
