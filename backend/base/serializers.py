from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from .models import *

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

	def validate(self, attrs):
		data = super().validate(attrs)

		serializer = UserSerializerWithToken(self.user).data

		for k,v in serializer.items():
			data[k] = v

		return data


class UserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source = 'first_name', required=False)
    _id = serializers.SerializerMethodField(read_only = True)
    isAdmin = serializers.SerializerMethodField(read_only = True)
    username = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = ['_id', 'username', 'email', 'name', 'isAdmin']

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

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                {
                    'email': 'A user with this email already exists.'
                }
            )
        return value
    
    def create(self, validated_data):
        return User.objects.create_user(
            username = validated_data.get('email'),
            first_name = validated_data.get('first_name'),
            email = validated_data.get('email'),
            password = validated_data.get('password')
        )

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only = True)

    class Meta:
        model = User
        fields = ['_id', 'username','email', 'name', 'isAdmin', 'token']

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
    class Meta:
        model = Category
        fields = ['_id','name', 'slug', 'description', 'createdAt',  'subCategory']

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
    

class UserAddressSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source = 'user.username')
    addressName = serializers.CharField(source = 'name')

    class Meta:
        model = UserAddress
        fields = '__all__'

    def validate_addressName(self,value):
        if UserAddress.objects.filter(name=value).exists():
            raise serializers.ValidationError(
                {
                    'detail': 'User address with this address name already exists.'
                }
            )
        return value


class UserPaymentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = UserPayment
        fields = '__all__'

    def validate_cardNumber(self, value):
        user = self.context['request'].user
        if UserPayment.objects.filter(user=user, cardNumber=value).exists():
            raise serializers.ValidationError(
                {
                    'detail': 'A card with the same number is already associated with your account.'
                }
            )
        return value
