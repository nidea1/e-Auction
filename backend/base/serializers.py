from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

	def validate(self, attrs):
		data = super().validate(attrs)

		serializer = UserSerializerWithToken(self.user).data

		for k,v in serializer.items():
			data[k] = v

		return data

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only = True)
    _id = serializers.SerializerMethodField(read_only = True)
    isAdmin = serializers.SerializerMethodField(read_only = True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username','email', 'name', 'isAdmin']

    def get__id(self, obj):
        return obj.id
    
    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        if name == '':
            name = 'Admin'
        return name
    
class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only = True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username','email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    
class BrandSerializer(serializers.ModelSerializer):

    class Meta:
        model = Brand
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'

class SubCategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only = True, source = 'categories')
    class Meta:
        model = Category
        fields = ['_id','name', 'slug', 'description', 'createdAt',  'subCategory', 'products']

    subCategory = serializers.SerializerMethodField()

    def get_subCategory(self, obj):
        if obj.children.exists():
            return SubCategorySerializer(obj.children.all(), many=True, context=self.context).data
        else:
            return None
          
class CategorySerializer(serializers.ModelSerializer):
    subCategory = SubCategorySerializer(many=True, read_only=True, source='children')
    class Meta:
        model = Category
        fields = ['_id','name', 'slug', 'description', 'createdAt', 'subCategory']

class CategoryDetailSerializer(serializers.ModelSerializer):
    subCategory = SubCategorySerializer(many=True, read_only=True, source='children')

    class Meta:
        model = Category
        fields = ['_id', 'name', 'slug', 'description', 'createdAt', 'subCategory']

    def to_representation(self, obj):
        data = super().to_representation(obj)
        request = self.context.get('request')
        brand = request.query_params.getlist('brand', [])

        if brand:
            products = Product.objects.filter(category=obj, brand__name__in=brand)
        else:
            products = Product.objects.filter(category=obj)

        data['products'] = ProductSerializer(products, many=True).data
        return data
    

class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = '__all__'
