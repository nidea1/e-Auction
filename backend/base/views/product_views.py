from ..models import Product, Brand
from ..serializers import ProductSerializer, BrandSerializer

from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView
from rest_framework.filters import SearchFilter, OrderingFilter

class ProductList(ListCreateAPIView):

	queryset = Product.objects.all()
	serializer_class = ProductSerializer
	filter_backends = [SearchFilter, OrderingFilter]
	search_fields = ['name', 'description', 'brand__name', 'category__name']
	ordering_fields = ['name', 'price']

class ProductDetail(RetrieveUpdateDestroyAPIView):

	queryset = Product.objects.all()
	serializer_class = ProductSerializer

class BrandList(ListCreateAPIView):

	queryset = Brand.objects.all()
	serializer_class = BrandSerializer

class BrandDetail(RetrieveAPIView):

	queryset = Brand.objects.all()
	serializer_class = BrandSerializer
