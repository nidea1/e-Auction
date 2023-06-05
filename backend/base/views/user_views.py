from django.contrib.auth.models import User
from rest_framework.request import Request
from ..serializers import UserSerializer
from rest_framework import serializers

from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from ..utils import activation_token, send_verification_email
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode

from drf_social_oauth2.views import TokenView, RevokeTokenView, ConvertTokenView
from oauth2_provider.models import AccessToken, RefreshToken

import os
from dotenv import load_dotenv
import requests

load_dotenv()


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

	serializer_class = UserSerializer
	permission_classes = [IsAuthenticated]

	def get_object(self):
		return self.request.user
	
	def perform_update(self, serializer):
		data = self.request.data
		user = self.get_object()

		if data.get('email', None):
			new_email = data['email']
			if User.objects.filter(email=new_email).exclude(pk=user.pk).exists():
				raise serializers.ValidationError(
					{
						'email': 'A user with this email already exists.'
					}
				)
			
		serializer.save()


class UserList(ListAPIView):
	serializer_class = UserSerializer
	queryset = User.objects.all()
	permission_classes = [IsAdminUser]


class UserLogin(TokenView):

	def post(self, request: Request, *args, **kwargs):
		response = super().post(request, *args, **kwargs)

		if response.status_code == 200 and 'access_token' in response.data and 'refresh_token' in response.data:
			response.set_cookie('access_token', response.data['access_token'], httponly=True, samesite=None, expires=36000)
			response.set_cookie('refresh_token', response.data['refresh_token'], httponly=True, samesite=None)

		return response


class UserLogout(RevokeTokenView):

	permission_classes = [IsAuthenticated]

	def post(self, request: Request, *args, **kwargs):

		access_token = AccessToken.objects.get(user=request.user, token=request.auth)
		RefreshToken.objects.filter(user=request.user, access_token=access_token).delete()
		access_token.delete()

		response = Response({'detail': 'Successfully logged out.'})
		
		response.delete_cookie('access_token')
		response.delete_cookie('refresh_token')
		response.delete_cookie('csrftoken')
		
		return response


class SocialLogin(ConvertTokenView):

	def post(self, request: Request, *args, **kwargs):
		response = super().post(request, *args, **kwargs)

		if response.status_code == 200 and 'access_token' in response.data and 'refresh_token' in response.data:
			response.set_cookie('access_token', response.data['access_token'], httponly=True, samesite=None, expires=36000)
			response.set_cookie('refresh_token', response.data['refresh_token'], httponly=True, samesite=None)

		return response


class GitHubLogin(APIView):

	def post(self, request):
		try:
			code = request.data.get('code')
			client_id = os.environ.get('SOCIAL_AUTH_GITHUB_KEY')
			client_secret = os.environ.get('SOCIAL_AUTH_GITHUB_SECRET')
			headers = {'Accept': 'application/json'}
			payload = {'client_id': client_id, 'client_secret': client_secret, 'code': code}

			response = requests.post('https://github.com/login/oauth/access_token', headers=headers, data=payload)
			response.raise_for_status()

			return Response(response.json(), status=status.HTTP_200_OK)
		except requests.exceptions.HTTPError as err:
			return Response({"detail": str(err)}, status=status.HTTP_400_BAD_REQUEST)


