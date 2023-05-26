from ..serializers import BidSerializer
from ..models import Bid, Product

from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status


class BidList(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = BidSerializer

    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ['product__name']
    ordering_fields = ['createdAt']

    def get_queryset(self):
        return Bid.objects.filter(user=self.request.user)

    def calculate_paid_amount(self, user, data):
        product = data.get('product')
        bid_amount = int(data['bid'])

        previous_bid = Bid.objects.filter(user=user, product=product).order_by('-bid').first()

        if previous_bid is not None:
            previous_bid_amount = int(previous_bid.bid)
            new_paid_amount = bid_amount - previous_bid_amount
        else:
            new_paid_amount = bid_amount

        return new_paid_amount

    @action(detail=False, methods=['POST'], url_path='calculate-payment')
    def calculate_additional_payment(self, request, *args, **kwargs):
        user = request.user

        new_paid_amount = self.calculate_paid_amount(
            user=user,
            data=request.data
        )

        previous_bid = Bid.objects.filter(user=user, product=request.data.get('product')).order_by('-bid').first()

        if Bid.objects.filter(bid__gte = request.data.get('bid'), product = request.data.get('product')):
            return Response(data={'detail': 'A bid equal to or higher than this already exists for this product.'}, status=status.HTTP_400_BAD_REQUEST)
        if Product.objects.get(_id = request.data.get('product')).price >= int(request.data.get('bid')):
            return Response(data={'detail': 'Your bid must be higher than the starting bid of the product.'}, status=status.HTTP_400_BAD_REQUEST)

        if previous_bid is not None:
            return Response(data={'previous_bid': previous_bid.bid, 'additional_payment': new_paid_amount}, status=status.HTTP_200_OK)
        else:
            return Response(data={'additional_payment': new_paid_amount}, status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        user = self.request.user

        new_paid_amount = self.calculate_paid_amount(
            user=user,
            data=serializer.validated_data
        )

        serializer.save(
            user=user,
            paidAmount=new_paid_amount
        )

class ProductBidList(viewsets.ModelViewSet):
    serializer_class = BidSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Bid.objects.filter(product=self.kwargs['product_id'])
    