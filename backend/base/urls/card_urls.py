from django.urls import path
from ..views.card_views import *

urlpatterns = [
    path('', CardList.as_view(), name='user_cards'),
    path('<int:pk>/', CardDetail.as_view(), name='user_card_detail'),
]
