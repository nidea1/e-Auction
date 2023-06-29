from django.utils import timezone
from datetime import timedelta
from celery import shared_task

from .utils import send_ending_email, send_winner_email, send_loser_email, create_order
from .models import Product, Status


@shared_task
def check_products_and_send_ending_email():
    now = timezone.now()
    one_hour_later = now + timedelta(hours=1)
    
    soon_ending_products = Product.objects.filter(endDate__lte = one_hour_later, endDate__gte= now, endingEmailSent = False, productStatus = Status.Active)

    for product in soon_ending_products:
        for bid in product.bids.all():
            if bid is not None:
                send_ending_email(bid.user, product)

        product.endingEmailSent = True
        product.save()

    return "Done sending ending mails."


@shared_task
def check_products_and_send_last_email():
    now = timezone.now()

    ending_products = Product.objects.filter(endDate__lte = now, lastEmailSent = False, productStatus = Status.Active)

    for product in ending_products:
        max_bid = product.bids.order_by('-bid').first()
        if max_bid is None:
            pass
        else:
            for bid in product.bids.all():
                if bid == max_bid:
                    send_winner_email(max_bid.user, product)
                    create_order(product, max_bid.user)
                else:
                    send_loser_email(bid.user, product)

        product.lastEmailSent = True
        product.productStatus = Status.Modified
        product.save()

    return "Done sending last mails."

