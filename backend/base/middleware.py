from django.utils.deprecation import MiddlewareMixin
from oauth2_provider.models import RefreshToken
from dotenv import load_dotenv
load_dotenv()
import os
import requests


class CustomCoookieMiddleware(MiddlewareMixin):
    def process_request(self, request):
        token = request.COOKIES.get('access_token')
        base_url = os.environ.get('BASE_API_URL')

        if token:
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {token}'
        else:
            refresh_token_str = request.COOKIES.get('refresh_token')
            if refresh_token_str:
                try:
                    data = {
                        'grant_type': 'refresh_token',
                        'client_id': os.environ.get('MAIN_AUTH_KEY'),
                        'client_secret': os.environ.get('MAIN_AUTH_SECRET'),
                        'refresh_token': refresh_token_str
                    }
                    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
                    response = requests.post(f'{base_url}/api/users/login/', data=data, headers=headers)
                    
                    if response.status_code == 200:
                        access_token = response.json()['access_token']
                        refresh_token = response.json()['refresh_token']

                        old_refresh_token = RefreshToken.objects.get(token=refresh_token_str)
                        old_refresh_token.delete()

                        request.META['HTTP_AUTHORIZATION'] = f'Bearer {access_token}'
                        request._new_access_token = access_token
                        request._new_refresh_token = refresh_token
                    else:
                        refresh_token = RefreshToken.objects.get(token=refresh_token_str)
                        refresh_token.delete()
                        request._delete_token = True

                except RefreshToken.DoesNotExist:
                    pass

    def process_response(self, request, response):
        if hasattr(request, '_new_access_token'):
            response.set_cookie('access_token', request._new_access_token, httponly=True, samesite='None', expires=36000, secure=True)

        if hasattr(request, '_new_refresh_token'):
            response.set_cookie('refresh_token', request._new_refresh_token, httponly=True, samesite='None', secure=True)

        if hasattr(request, '_delete_token'):
            response.delete_cookie('access_token')
            response.delete_cookie('refresh_token')

        return response
