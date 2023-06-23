from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password, make_password
from datetime import timedelta
from django.utils import timezone

from .models import *


class UserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source = 'first_name', required=False)
    _id = serializers.SerializerMethodField(read_only = True)
    isAdmin = serializers.SerializerMethodField(read_only = True)
    password = serializers.CharField(write_only=True, required=True)
    isSocialRegisterCompleted = serializers.SerializerMethodField(read_only = True)

    class Meta:
        model = User
        fields = ['_id', 'name', 'email', 'isAdmin', 'password', 'isSocialRegisterCompleted']

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
    
    def get_isSocialRegisterCompleted(self, obj):
        isSocialRegisteredCompleted = obj.has_usable_password()
        return isSocialRegisteredCompleted

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
            email = validated_data.get('email'),
            password = validated_data.get('password'),
            first_name = validated_data.get('first_name'),
            is_active = False
        )
    
    def update(self, user, validated_data):
        password = validated_data.get('password', user.password)
        
        if not user.has_usable_password() or check_password(password, user.password):
            user.first_name = validated_data.get('first_name', user.first_name)
            user.email = validated_data.get('email', user.email)
            user.password = make_password(password)

            user.save()
            return user
        
        else:
            raise serializers.ValidationError(
                {
                    'detail': 'Your password is not correct.'
                }
            )

    
class BrandSerializer(serializers.ModelSerializer):

    class Meta:
        model = Brand
        fields = '__all__'


class ProductImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductImage
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['_id', 'images', 'slug', 'name', 'price', 'currentHighestBid', 'startDate', 'endDate']
    
    def create(self, validated_data):
        images = self.context['request'].FILES.getlist('images')
        user = self.context['request'].user
        start_date = timezone.localtime(timezone.now()) + timedelta(days=3)
        product = Product.objects.create(user=user, startDate=start_date, **validated_data)

        for image in images:
            ProductImage.objects.create(product=product, image=image)

        return product


class ProductDetailSerializer(ProductSerializer):
    seller = serializers.SerializerMethodField()
    brandName = serializers.SerializerMethodField()

    def get_seller(self, obj):
        return obj.user.first_name
    
    def get_brandName(self, obj):
        return obj.brand.name
    
    class Meta(ProductSerializer.Meta):
        fields = ProductSerializer.Meta.fields + ['seller', 'user', 'brandName', 'videoURL', 'description', 'useStatus', 'province', 'district', 'totalBids']


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
        user = self.context['request'].user
        if UserAddress.objects.filter(user=user, name=value).exists():
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


class BidSerializer(serializers.ModelSerializer):
    productName = serializers.ReadOnlyField(source= 'product.name')
    userName = serializers.ReadOnlyField(source= 'user.first_name')
    productSlug = serializers.ReadOnlyField(source= 'product.slug')
    productImage = serializers.SerializerMethodField()
    isMaxBid = serializers.SerializerMethodField()
    isFinish = serializers.SerializerMethodField()

    class Meta:
        model = Bid
        fields = '__all__'

    def get_productImage(self, obj):
        product_image = obj.product.images.first()
        request = self.context['request']
        if product_image:
            return request.build_absolute_uri(product_image.image.url)
        return None
    
    def get_isMaxBid(self, obj):
        max_bid = obj.product.bids.order_by('-bid').first()
        if obj == max_bid:
            return True
        return False
    
    def get_isFinish(self, obj):
        status = obj.product.productStatus
        if status == Status.Passive:
            return True
        return False
    
    def validate_bid(self, value):
        product = self.context['request'].data.get('product')

        if Product.objects.get(_id = product).user == self.context['request'].user:
            raise serializers.ValidationError(
                {
                    'detail': 'You can not bid your product.'
                }
            )
        if Bid.objects.filter(bid__gte = value, product=product).exists():
            raise serializers.ValidationError(
                {
                    'detail': 'A bid equal to or higher than this already exists for this product.'
                }
            )
        if Product.objects.get(_id = product).price >= value:
            raise serializers.ValidationError(
                {
                    'detail': 'Your bid must be higher than the starting bid of the product.'
                }
            )
        return value


class OrderDetailSerializer(serializers.ModelSerializer):
    productName = serializers.SerializerMethodField(read_only=True)
    productImage = serializers.SerializerMethodField(read_only=True)
    paidPrice = serializers.SerializerMethodField(read_only=True)
    seller = serializers.SerializerMethodField(read_only=True)
    buyer = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'


    def get_productName(self, obj):
        return obj.product.name

    def get_productImage(self, obj):
        product_image = obj.product.images.first()
        request = self.context['request']
        if product_image:
            return request.build_absolute_uri(product_image.image.url)
        return None

    def get_paidPrice(self, obj):
        return obj.product.currentHighestBid

    def get_seller(self, obj):
        return obj.seller.first_name

    def get_buyer(self, obj):
        return obj.buyer.first_name


class BuyingOrderSerializer(OrderDetailSerializer):

    class Meta:
        model = Order
        fields = ['_id', 'productName', 'productImage', 'paidPrice', 'seller', 'createdAt']


class ConfirmedOrderSerializer(OrderDetailSerializer):

    class Meta:
        model = Order
        fields = ['_id', 'productName', 'productImage', 'paidPrice', 'seller', 'buyer','confirmedAt', 'address', 'inShipping', 'shippingAt', 'shippingCode', 'isDelivered', 'deliveredAt']

