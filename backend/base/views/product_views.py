from ..models import Product
from ..serializers import ProductSerializer

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

class ProductList(APIView):

	def get(self, request):
		products = Product.objects.all()
		serializer = ProductSerializer(products, many=True)
		return Response(serializer.data)

class ProductDetail(APIView):

	def get_product(self,pk):
		try:
			return Product.objects.get(_id = pk)
		except:
			message = {'detail' : 'Product not found.'}
			return Response(message, status=status.HTTP_404_NOT_FOUND)


	def get(self, request, pk):
		product = self.get_product(pk)
		serializer = ProductSerializer(product)
		return Response(serializer.data)
