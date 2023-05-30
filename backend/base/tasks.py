from django.utils import timezone
from datetime import timedelta
from celery import shared_task

from .utils import send_ending_email
from .models import Product

@shared_task
def check_products_and_send_email():
    now = timezone.now()
    one_hour_later = now + timedelta(hours=1)
    
    soon_ending_products = Product.objects.filter(endDate__lte = one_hour_later, endDate__gte= now, ending_email_sent = False)

    for product in soon_ending_products:
        for bid in product.bids.all():
            send_ending_email(bid.user, product)

        product.ending_email_sent = True
        product.save()

    return "Done sending mails."
