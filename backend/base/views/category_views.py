from ..models import Category
from ..serializers import CategorySerializer, CategoryDetailSerializer, CategoryProductsSerializer

from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response

class CategoryList(ListAPIView):
    
    serializer_class = CategorySerializer
    queryset = Category.objects.filter(parent=None)



class CategoryDetail(RetrieveAPIView):

    serializer_class = CategoryDetailSerializer
    queryset = Category.objects.all()

class CategoryProductList(RetrieveAPIView):

    serializer_class = CategoryProductsSerializer
    queryset = Category.objects.all()
