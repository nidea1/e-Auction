from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Product)
admin.site.register(Bid)
admin.site.register(Order)
admin.site.register(Orderltem)
admin.site.register(ShippingAddress)