from django.urls import path
from ..views.user_views import *

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', registerUser, name='register_user'),

    path('', getUsers, name='users',),
    path('profile/', getUserProfile, name='user_profile',),
    path('profile/update/', updateUserProfile, name='user_profile_update',),
]