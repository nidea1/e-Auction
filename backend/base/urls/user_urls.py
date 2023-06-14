from django.urls import path, include
from ..views.user_views import *

urlpatterns = [
    path('register/', UserRegister.as_view(), name='user_register'),
    path('login/', UserLogin.as_view(), name='user_login'),
    path('social/', SocialLogin.as_view(), name='social_login'),
    path('github/', GitHubLogin.as_view(), name='github_login'),
    path('logout/', UserLogout.as_view(), name='user_logout'),
    path('profile/', UserProfile.as_view(), name='user_profile'),
    path('delete/', UserDeleteProfile.as_view(), name='user_delete'),
    path('addresses/', include('base.urls.address_urls')),
    path('cards/', include('base.urls.card_urls')),
    path('bids/', include('base.urls.bid_urls')),
    path('orders/', include('base.urls.order_urls')),
    path('', UserList.as_view(), name='users'),
    path('activate/<uidb64>/<token>/', UserVerify.as_view(), name='activate_acc'),
    path('activate/resend/', ResendVerifactionEmail.as_view(), name='resend_mail'),
]
