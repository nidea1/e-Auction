from django.utils.deprecation import MiddlewareMixin
import requests
from dotenv import load_dotenv
import os
load_dotenv()
from django.http import JsonResponse


class CookieAuthenticationMiddleware(MiddlewareMixin):
    def process_request(self, request):
        token = request.COOKIES.get('access_token')
        refresh = request.COOKIES.get('refresh_token')
        if not token and refresh:
            data = {
                'grant_type': 'refresh_token',
                'client_id': os.environ.get('MAIN_AUTH_KEY'),
                'client_secret': os.environ.get('MAIN_AUTH_SECRET'),
                'refresh_token': refresh
            }
            response = requests.post('http://localhost:8000/api/users/login/', data=data)

            if response.status_code == 200:
                token = response.json().get('access_token')
                request.META['HTTP_AUTHORIZATION'] = f"Bearer {token}"
            else:
                new_response = JsonResponse({'detail': 'You must be logged in.'}, status=401)
                new_response.delete_cookie('refresh_token')
                return new_response
        elif token:
            request.META['HTTP_AUTHORIZATION'] = f"Bearer {token}"
