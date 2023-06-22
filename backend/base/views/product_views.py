from ..models import Product, Brand, ProductImage, User
from ..serializers import ProductSerializer, BrandSerializer
from ..filters import ProductFilter

from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from datetime import timedelta
from django.utils import timezone

class ProductList(ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    filterset_class = ProductFilter
    ordering_fields = ['name', 'price', 'endDate']

    def perform_create(self, serializer):

        user_id = self.request.data.get('userID')
        user = User.objects.get(id = user_id)

        start_date = timezone.localtime(timezone.now()) + timedelta(days=3)
        
        serializer.save(user=user, startDate = start_date)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Saving product
        self.perform_create(serializer)
        product = serializer.instance

        # Saving images
        images = request.data.getlist('images')
        for image in images:
            ProductImage.objects.create(product=product, image=image)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class ProductDetail(RetrieveUpdateDestroyAPIView):

	queryset = Product.objects.all()
	serializer_class = ProductSerializer

class BrandList(ListCreateAPIView):

	queryset = Brand.objects.all()
	serializer_class = BrandSerializer
