from ..models import Category
from ..serializers import CategorySerializer

from rest_framework.generics import ListAPIView, RetrieveAPIView
from django_filters.rest_framework import DjangoFilterBackend


class CategoryList(ListAPIView):
    
    serializer_class = CategorySerializer
    queryset = Category.objects.filter(parent=None)
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ('children',)


class CategoryDetail(RetrieveAPIView):

    serializer_class = CategorySerializer
    queryset = Category.objects.all()
