from ..models import Product, Brand
from ..serializers import ProductSerializer, BrandSerializer
from ..filters import ProductFilter

from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

class ProductList(ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_class = ProductFilter
    ordering_fields = ['name', 'price', 'endDate']


class ProductDetail(RetrieveUpdateDestroyAPIView):

	queryset = Product.objects.all()
	serializer_class = ProductSerializer


class BrandList(ListCreateAPIView):

	queryset = Brand.objects.all()
	serializer_class = BrandSerializer
