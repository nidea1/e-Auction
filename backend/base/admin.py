from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Brand)
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(ProductImage)
admin.site.register(Bid)
admin.site.register(Order)
admin.site.register(UserAddress)
admin.site.register(UserPayment)
