from ..models import Category
from ..serializers import CategorySerializer, CategoryDetailSerializer

from rest_framework.generics import ListAPIView, RetrieveAPIView

class CategoryList(ListAPIView):
    
    serializer_class = CategorySerializer
    queryset = Category.objects.filter(parent=None)


class CategoryDetail(RetrieveAPIView):

    serializer_class = CategoryDetailSerializer
    queryset = Category.objects.all()
