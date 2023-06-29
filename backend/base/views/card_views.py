from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated

from ..models import UserPayment
from ..serializers import UserPaymentSerializer


class CardList(ListCreateAPIView):
    
    serializer_class = UserPaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserPayment.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CardDetail(RetrieveUpdateDestroyAPIView):

    queryset = UserPayment.objects.all()
    serializer_class = UserPaymentSerializer
    permission_classes = [IsAuthenticated]

    