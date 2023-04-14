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
    products = serializers.SerializerMethodField(read_only = True)

    class Meta:
        model = Brand
        fields = ['_id','name','products']

    def get_products(self, obj):
        products = Product.objects.filter(brand = obj)
        return ProductDetailSerializer(products,many=True).data

class ProductDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ['_id','name','image','description','price','endDate','currentHighestBid','totalBids','brand']

class CategorySerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField(read_only = True)

    class Meta:
        model = Category
        fields = ['_id','name','description','parent','products']

    def get_products(self, obj):
        products = Product.objects.filter(category = obj)
        return ProductDetailSerializer(products,many=True).data
    
class CategoryListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ['_id','name','description','parent']
        depth = 1
    

class ProductSerializer(serializers.ModelSerializer):
    category = CategoryListSerializer()
    brand = BrandSerializer()

    class Meta:
        model = Product
        fields = '__all__'

class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = '__all__'
