from django_filters import rest_framework as filters
from django_filters.filters import ModelMultipleChoiceFilter
from .models import Product, Category, Brand

def get_all_children(category):
    _children = []
    def _get_children(categories):
        for category in categories:
            _children.append(category._id)
            _get_children(category.children.all())
                
    _get_children(category.children.all())
    _children.append(category._id)
    return _children

class ProductFilter(filters.FilterSet):
    category = filters.CharFilter(method='filter_by_all_subcategories')
    brand = ModelMultipleChoiceFilter(
        field_name = 'brand___id',
        to_field_name= '_id',
        queryset = Brand.objects.all(),
        conjoined = False,
    )

    class Meta:
        model = Product
        fields = ['category','brand']

    def filter_by_all_subcategories(self, queryset, name, value):
        category = Category.objects.get(_id=value)
        all_categories = get_all_children(category)
        return queryset.filter(category__in=all_categories)
