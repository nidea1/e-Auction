from django.contrib.sessions.middleware import SessionMiddleware
from django.contrib.auth.middleware import AuthenticationMiddleware
from django.contrib.auth.models import AnonymousUser
from django.core.cache import cache
from django.contrib.auth import get_user

class CacheUserMiddleware(AuthenticationMiddleware):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        session_middleware = SessionMiddleware(self.get_response)
        session_middleware.process_request(request)

        user_id = request.session.get('_auth_user_id')

        if user_id:
            cache_key = f'user_{user_id}'
            user = cache.get(cache_key)

            if not user:
                user = get_user(request)
                if user.is_authenticated:
                    cache.set(cache_key, user)

            if user:
                request.user = user
            else:
                request.user = AnonymousUser()
        else:
            request.user = AnonymousUser()

        response = self.get_response(request)
        session_middleware.process_response(request, response)

        return response