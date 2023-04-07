from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Product)
admin.site.register(Bid)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(UserAddress)
admin.site.register(UserPayment)