from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Bid

@receiver(post_save, sender=Bid)
@receiver(post_delete, sender=Bid)
def update_product(sender, instance, **kwargs):
    product = instance.product
    bids = Bid.objects.filter(product=product)
    product.totalBids = bids.count()
    product.currentHighestBid = bids.order_by('-bid').first().bid if bids.exists() else 0
    product.save()
