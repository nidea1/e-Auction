from ..serializers import BidSerializer
from ..models import Bid

from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListCreateAPIView

class BidList(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BidSerializer
    
    def get_queryset(self):
        return Bid.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
