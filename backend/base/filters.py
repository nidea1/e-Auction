from django_filters import rest_framework as filters
from django_filters.filters import ModelMultipleChoiceFilter, ModelChoiceFilter
from .models import Product, Category, Brand, Order
from django.contrib.auth.models import User
from django.utils import timezone
from django.db.models import Q

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
    status = filters.BooleanFilter(label = 'Status', method='filter_by_active')

    brand = ModelMultipleChoiceFilter(
        field_name = 'brand___id',
        to_field_name= '_id',
        queryset = Brand.objects.all(),
        conjoined = False,
    )

    user = ModelChoiceFilter(
        queryset = User.objects.all(),
        field_name = 'user__email',
        to_field_name = 'id'
    )

    class Meta:
        model = Product
        fields = ['category','brand','user','status']

    def filter_by_all_subcategories(self, queryset, name, value):
        category = Category.objects.get(_id=value)
        all_categories = get_all_children(category)
        return queryset.filter(category__in=all_categories)
    
    def filter_by_active(self, queryset, name, value):
        current_time = timezone.now()
        if value:
            return queryset.filter(endDate__gte = current_time)
        else:
            return queryset.filter(endDate__lte = current_time)


class OrderFilter(filters.FilterSet):
    isDelivered = filters.BooleanFilter(field_name='isDelivered', label='Status')
    search = filters.CharFilter(method='search_filter', label='Search')

    class Meta:
        model = Order
        fields = []

    def search_filter(self, queryset, name, value):
        return queryset.filter(
            Q(product__name__icontains=value) |
            Q(seller__first_name__icontains=value)
        )
