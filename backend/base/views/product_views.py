from django.shortcuts import render
from django.core.cache import cache
from django.contrib.auth.decorators import login_required

from ..models import Product
from ..serializers import ProductSerializer

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

@api_view(['GET'])
def getProducts(request):
	products = Product.objects.all()
	serializer = ProductSerializer(products, many = True)
	return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
	product = Product.objects.get(_id = pk)
	serializer = ProductSerializer(product, many = False)
	return Response(serializer.data)
