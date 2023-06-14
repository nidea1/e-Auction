from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Bid

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import json

from datetime import timedelta
from django.utils import timezone


def wsMessage(product_id, amount, bid_count, endDate):
    channel_layer = get_channel_layer()
    

    if endDate:
        message = json.dumps(
            {
                'amount': amount,
                'bid_count': bid_count,
                'closes_in': f'{endDate}'
            }
        )
    else:
        message = json.dumps(
            {
                'amount': amount,
                'bid_count': bid_count,
            }
        )

    async_to_sync(channel_layer.group_send)(
        f'auction_{product_id}',
        {
            'type': 'auction_message',
            'message': message
        }
    )


def update_product(instance):
    product = instance.product
    bids = Bid.objects.filter(product=product)
    product.totalBids = bids.count()
    product.currentHighestBid = bids.order_by('-bid').first().bid if bids.exists() else 0
    return product


@receiver(post_save, sender=Bid)
@receiver(post_delete, sender=Bid)
def save_product(instance, created= False, *args, **kwargs):
    product = update_product(instance)
    isChangeDate = False

    if created:
        if (product.endDate - timezone.now()) <= timedelta(minutes=5):
            product.endDate += timedelta(minutes=5)
            isChangeDate = True

    product.save()

    wsMessage(
        product_id= product._id,
        amount= product.currentHighestBid,
        bid_count= product.totalBids,
        endDate= product.endDate if isChangeDate else False
    )
