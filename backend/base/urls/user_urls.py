from django.urls import path, include
from ..views.user_views import *

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='user_login'),
    path('register/', UserRegister.as_view(), name='user_register'),
    path('profile/', UserProfile.as_view(), name='user_profile'),
    path('addresses/', include('base.urls.address_urls')),
    path('cards/', include('base.urls.card_urls')),
    path('', UserList.as_view(), name='users')
]
