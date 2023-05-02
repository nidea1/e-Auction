from django.contrib.auth.models import User
from ..serializers import UserSerializer, UserSerializerWithToken, MyTokenObtainPairSerializer

from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairView(TokenObtainPairView):
	serializer_class = MyTokenObtainPairSerializer

		
class UserRegister(CreateAPIView):

	serializer_class = UserSerializerWithToken
	queryset = User.objects.all()

	def perform_create(self, serializer):
		serializer.save()
		

class UserProfile(RetrieveUpdateDestroyAPIView):

	serializer_class = UserSerializerWithToken
	permission_classes = [IsAuthenticated]

	def get_object(self):
		return self.request.user
	
	def perform_update(self, serializer):
		data = self.request.data
		user = self.get_object()

		if data.get('name', None):
			user.first_name = data['name']
		if data.get('email', None):
			user.username = data['email']
			user.email = data['email']

		user.save()
		serializer.save()
	

class UserList(ListAPIView):
	serializer_class = UserSerializer
	queryset = User.objects.all()
	permission_classes = [IsAdminUser]
