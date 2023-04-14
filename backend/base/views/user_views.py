from django.contrib.auth.models import User
from ..serializers import UserSerializer, UserSerializerWithToken, MyTokenObtainPairSerializer

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response


from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password

class MyTokenObtainPairView(TokenObtainPairView):
	serializer_class = MyTokenObtainPairSerializer

class UserRegister(APIView):

	# post method for user register
	def post(self, request):
		data = request.data

		try:
			user = User.objects.create(
				first_name = data['name'],
				username = data['email'],
				email = data['email'],
				password = make_password(data['password'])
			)
			serializer = UserSerializerWithToken(user)
			return Response(serializer.data)
		
		except:
			message = {'detail' : 'User with this email already exist.'}
			return Response(message, status=status.HTTP_400_BAD_REQUEST)

class UserProfile(APIView):
	permission_classes = [IsAuthenticated]

	def get_user(self):
		return self.request.user

	def get(self, request):
		user = self.get_user()
		serializer = UserSerializer(user)
		return Response(serializer.data)

	def put(self, request):
		user = self.get_user()
		data = request.data

		if 'name' in data:
			user.first_name = data['name']

		if 'email' in data:
			user.username = data['email']
			user.email = data['email']

		if data.get('password'):
			user.password = make_password(data['password'])
		
		user.save()

		serializer = UserSerializerWithToken(user)
		return Response(serializer.data)
	
	def delete(self, request):

		user = self.get_user()
		
		user.delete()

		message = {'detail' : 'User has been deleted.'}
		return Response(message, status=status.HTTP_204_NO_CONTENT)

class UserList(ListAPIView):
	serializer_class = UserSerializer
	queryset = User.objects.all()
	permission_classes = [IsAdminUser]
