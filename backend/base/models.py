from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify

# Create your models here.

class Brand(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    
    def __str__(self) -> str:
        return str(self.name)

class Category(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200, null=True, blank=True)
    slug = models.SlugField(null=True,blank=True,unique=True)
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='children')
    description = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    
    def __str__(self) -> str:
        return str(self.name)
    
    def save(self, *args, **kwargs) -> str:
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    slug = models.SlugField(null=True,blank=True,unique=True)
    image = models.ImageField(null=True,blank=True)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True, related_name='categories')
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, null=True, blank=True, related_name='brands')
    endDate = models.DateTimeField()
    createdAt = models.DateTimeField(auto_now_add=True)
    currentHighestBid = models.IntegerField(null=True, blank=True, default=0)
    totalBids = models.IntegerField(default=0)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) -> str:
        return str(self.name)
    
    def save(self, *args, **kwargs) -> str:
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
class Bid(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    bid = models.IntegerField(null=False, blank=False, default=0)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) -> str:
        return f'{self.user.username} bidded {self.bid} to {self.product.name}'
    
class Order(models.Model):
    buyer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='orders_as_buyer')
    seller = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='orders_as_seller')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) -> str:
        return str(self.createdAt)

class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) -> str:
        return str(self.name)
    
class UserAddress(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addresses', null=True, blank=True)
    description = models.CharField(max_length=200, null=True, blank=True)
    province = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    mobile = models.CharField(max_length=12, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self) -> str:
        return f'{self.user.username}: {self.name}'
    
class UserPayment(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments')
    cardOwner = models.CharField(max_length=200, null=True, blank=True)
    cardNumber = models.CharField(max_length=16, null=True, blank=True)
    expDate = models.CharField(max_length=5, null=True, blank=True)
    ccv = models.CharField(max_length=3, null=True, blank=True)

    def __str__(self) -> str:
        return str(self.cardOwner)


