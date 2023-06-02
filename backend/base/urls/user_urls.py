from django.urls import path, include
from ..views.user_views import *
from social_django.views import disconnect

urlpatterns = [
    path('register/', UserRegister.as_view(), name='user_register'),
    path('login/', UserLogin.as_view(), name='user_login'),
    path('logout/', UserLogout.as_view(), name='user_logout'),
    path('profile/', UserProfile.as_view(), name='user_profile'),
    path('addresses/', include('base.urls.address_urls')),
    path('cards/', include('base.urls.card_urls')),
    path('bids/', include('base.urls.bid_urls')),
    path('', UserList.as_view(), name='users'),
    path('activate/<uidb64>/<token>/', UserVerify.as_view(), name='activate_acc'),
    path('activate/resend/', ResendVerifactionEmail.as_view(), name='resend_mail'),
]
