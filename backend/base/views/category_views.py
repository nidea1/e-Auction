from ..models import Category
from ..serializers import CategorySerializer, CategoryListSerializer

from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response

class CategoryList(ListAPIView):
    
    serializer_class = CategoryListSerializer
    queryset = Category.objects.all()

class CategoryDetailView(RetrieveAPIView):

    queryset = Category.objects.all()
    serializer_class = CategorySerializer
