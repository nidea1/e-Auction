from django.utils.deprecation import MiddlewareMixin

class CookieAuthenticationMiddleware(MiddlewareMixin):
    def process_request(self, request):
        token = request.COOKIES.get('access_token')
        if token:
            request.META['HTTP_AUTHORIZATION'] = f"Bearer {token}"
