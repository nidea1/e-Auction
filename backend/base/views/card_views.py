from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..models import UserPayment
from ..serializers import UserPaymentSerializer
    
class CardList(ListCreateAPIView):
    
    serializer_class = UserPaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserPayment.objects.filter(user=self.request.user)
    
    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        

class CardDetail(RetrieveUpdateDestroyAPIView):

    queryset = UserPayment.objects.all()
    serializer_class = UserPaymentSerializer
    permission_classes = [IsAuthenticated]

    