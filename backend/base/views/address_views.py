from ..serializers import UserAddressSerializer
from ..models import UserAddress

from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

		
class UserAddressList(ListCreateAPIView):

	serializer_class = UserAddressSerializer
	permission_classes = [IsAuthenticated]

	def get_queryset(self):
		return UserAddress.objects.filter(user=self.request.user)
	
	def perform_create(self, serializer):
		serializer.save(user=self.request.user)
	
	
class UserAddressDetail(RetrieveUpdateDestroyAPIView):

	queryset = UserAddress.objects.all()
	serializer_class = UserAddressSerializer
	permission_classes = [IsAuthenticated]
