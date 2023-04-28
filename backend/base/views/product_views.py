from ..models import Product, Brand
from ..serializers import ProductSerializer, BrandSerializer
from ..filters import ProductFilter

from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

class ProductList(ListCreateAPIView):
    serializer_class = ProductSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_class = ProductFilter
    search_fields = ['name', 'brand__name', 'category__name']
    ordering_fields = ['name', 'price']

    def get_queryset(self):
        return Product.objects.all()

class ProductDetail(RetrieveUpdateDestroyAPIView):

	queryset = Product.objects.all()
	serializer_class = ProductSerializer

class BrandList(ListCreateAPIView):

	queryset = Brand.objects.all()
	serializer_class = BrandSerializer
