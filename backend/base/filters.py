from django_filters import rest_framework as filters
from django_filters.filters import ModelMultipleChoiceFilter, ModelChoiceFilter
from .models import Product, Category, Brand, Order, Status
from django.contrib.auth.models import User
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
        
    search = filters.CharFilter(method='search_filter', label='Search a product, brand or category')
    
    productStatus = filters.ChoiceFilter(
        choices = (
            (Status.Active.value, 'Active'),
            (Status.Modified.value, 'Modified'),
            ('all', 'All Products'),
        ),
        label = 'Product Status',
        method = 'status_filter'
    )

    category = filters.ModelChoiceFilter(
        method = 'filter_by_all_subcategories',
        queryset = Category.objects.all(),
        label = 'Select a category'
    )

    brand = ModelMultipleChoiceFilter(
        queryset = Brand.objects.all(),
        conjoined = False,
        label = 'Select a brands'
    )

    user = ModelChoiceFilter(
        queryset = User.objects.all(),
        label = 'User from user email'
    )

    class Meta:
        model = Product
        fields = []

    def filter_by_all_subcategories(self, queryset, name, value):
        all_categories = get_all_children(value)
        return queryset.filter(category__in=all_categories)
    
    def status_filter(self, queryset, name, value):
        if value == 'all':
            return queryset.exclude(productStatus=Status.Passive.value)
        return queryset.filter(productStatus=value)
        
    def search_filter(self, queryset, name, value):
        matching_categories = Category.objects.filter(name__icontains=value)
        all_categories = []
        for category in matching_categories:
            all_categories.extend(get_all_children(category))
        return queryset.filter(
            Q(category__in=all_categories) |
            Q(name__icontains=value) |
            Q(brand__name__icontains=value)
        )


class OrderFilter(filters.FilterSet):
    inShipping = filters.BooleanFilter(field_name='inShipping', label='Is in shipping?')
    isDelivered = filters.BooleanFilter(field_name='isDelivered', label='Status')
    search = filters.CharFilter(method='search_filter', label='Search')

    class Meta:
        model = Order
        fields = []

    def search_filter(self, queryset, name, value):
        if 'buyer' in self.request.path:
            return queryset.filter(
                Q(product__name__icontains=value) |
                Q(seller__first_name__icontains=value)
            )
        elif 'seller' in self.request.path:
            return queryset.filter(
                Q(product__name__icontains=value) |
                Q(buyer__first_name__icontains=value)
            )
