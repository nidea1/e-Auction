from django.contrib.auth.models import User
from ..serializers import UserSerializer, UserSerializerWithToken, MyTokenObtainPairSerializer
from rest_framework import serializers

from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status

from ..utils import activation_token, send_verification_email
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode

class MyTokenObtainPairView(TokenObtainPairView):
	serializer_class = MyTokenObtainPairSerializer


class UserRegister(CreateAPIView):

	serializer_class = UserSerializer
	queryset = User.objects.all()

	def perform_create(self, serializer):
		user = serializer.save()
		send_verification_email(self.request, user)

class UserVerify(APIView):

	def get(self, request, uidb64, token, *args, **kwargs):
		try:
			uid = force_str(urlsafe_base64_decode(uidb64))
			user = User.objects.get(pk=uid)
			if activation_token.check_token(user, token):
				user.is_active = True
				user.save()
				return Response({'detail': 'Account activated successfully. You can login now.'}, status=status.HTTP_200_OK)
			else:
				return Response({'detail': 'Activation link is invalid'}, status=status.HTTP_400_BAD_REQUEST)
		except:
			return Response({'detail': 'Activation link is invalid'}, status=status.HTTP_400_BAD_REQUEST)

		
class ResendVerifactionEmail(APIView):

	def post(self, request):
		email = request.data.get('email')
		try:
			user = User.objects.get(email=email)

		except User.DoesNotExist:
			return Response({'detail': 'No user found with this email address.'}, status=status.HTTP_400_BAD_REQUEST)
		
		if user.is_active:
			return Response({'detail': 'User account is already activated.'}, status=status.HTTP_400_BAD_REQUEST)
		
		send_verification_email(request, user)
		return Response({'detail': 'Activation mail has been sent.'}, status=status.HTTP_200_OK)


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
			new_email = data['email']
			if User.objects.filter(email=new_email).exclude(pk=user.pk).exists():
				raise serializers.ValidationError(
					{
						'email': 'A user with this email already exists.'
					}
				)
			else:
				user.username = new_email
				user.email = new_email

		user.save()
		serializer.save()
	

class UserList(ListAPIView):
	serializer_class = UserSerializer
	queryset = User.objects.all()
	permission_classes = [IsAdminUser]
