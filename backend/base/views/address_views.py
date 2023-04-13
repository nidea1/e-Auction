from ..serializers import UserAddressSerializer
from ..models import UserAddress

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

class UserAddressesList(APIView):

	permission_classes = [IsAuthenticated]

	def get(self, request):

		addresses = UserAddress.objects.filter(user=request.user)
		serializer = UserAddressSerializer(addresses, many = True)
		return Response(serializer.data)
	
	def post(self, request):

		data = request.data

		try:
			userAddress = UserAddress.objects.create(
				user = request.user,
				address = data['address'],
				city = data['city'],
				district = data['district'],
				postalCode = data['postalCode'],
				mobile = data['mobile'],
				name = data['addressName']
			)

			serializer = UserAddressSerializer(userAddress)

			return Response(serializer.data)

		except:
			message = {'detail' : 'User address with this name already exist.'}
			return Response(message, status=status.HTTP_400_BAD_REQUEST)
		
class UserAddressDetail(APIView):

	permission_classes = [IsAuthenticated]

	def get_user_adress(self, pk):
		try:
			return UserAddress.objects.get(_id = pk, user = self.request.user)
		except:
			message = {'detail' : 'User address not found.'}
			return Response(message, status=status.HTTP_404_NOT_FOUND)
		
	def get(self, request, pk):
		userAddress = self.get_user_adress(pk)
		serializer = UserAddressSerializer(userAddress)
		return Response(serializer.data)
	
	def put(self, request, pk):
		userAddress = self.get_user_adress(pk)
		data = request.data

		if data['description'] != '':
			userAddress.description = data['description']
		if data['province'] != '':
			userAddress.province = data['province']
		if data['city'] != '':
			userAddress.city = data['city']
		if data['postalCode'] != '':
			userAddress.postalCode = data['postalCode']
		if data['mobile'] != '':
			userAddress.mobile = data['mobile']
		if data['addressName'] != '':
			userAddress.name = data['addressName']
		
		userAddress.save()

		serializer = UserAddressSerializer(userAddress)
		return Response(serializer.data)
	
	def delete(self, request, pk):
		userAddress = self.get_user_adress(pk)
		userAddress.delete()

		message = {'detail' : 'User address has been deleted.'}
		return Response(message, status=status.HTTP_204_NO_CONTENT)
