from django.urls import path
from ..views.user_views import *

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='user_login'),
    path('register/', UserRegister.as_view(), name='user_register'),
    path('profile/', UserProfile.as_view(), name='user_profile'),
    path('', UserList.as_view(), name='users')
]
