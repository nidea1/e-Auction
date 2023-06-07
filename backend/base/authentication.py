import requests
from dotenv import load_dotenv
import os
load_dotenv()
from django.http import JsonResponse
from oauth2_provider.models import RefreshToken, AccessToken
from django.contrib.auth.models import AnonymousUser
from oauth2_provider.contrib.rest_framework.authentication import OAuth2Authentication
from .utils import delete_cookies


class CookieOAuth2Authentication(OAuth2Authentication):
    def authenticate(self, request):
        token = request.COOKIES.get('access_token')
        refresh = request.COOKIES.get('refresh_token')
        unauthorized_response = JsonResponse({'detail': 'You must be logged in.'}, status=401)
        base_url = os.environ.get('BASE_API_URL')

        try:
            if not token and refresh:
                if not RefreshToken.objects.filter(user=request.user, token=refresh).exists():
                    return AnonymousUser(), delete_cookies(unauthorized_response)

                data = {
                    'grant_type': 'refresh_token',
                    'client_id': os.environ.get('MAIN_AUTH_KEY'),
                    'client_secret': os.environ.get('MAIN_AUTH_SECRET'),
                    'refresh_token': refresh
                }
                headers = {'Content-Type': 'application/x-www-form-urlencoded'}
                response = requests.post(f'{base_url}/api/users/login/', data=data, headers=headers)

                if response.status_code != 200:
                    return AnonymousUser(), delete_cookies(unauthorized_response)

                token = response.json().get('access_token')

            if token:
                access_token = AccessToken.objects.get(token=token)

                if access_token.is_expired():
                    return AnonymousUser(), delete_cookies(unauthorized_response)

                request.META['HTTP_AUTHORIZATION'] = f'Bearer {token}'
            else:
                return AnonymousUser(), unauthorized_response

        except AccessToken.DoesNotExist:
            return AnonymousUser(), delete_cookies(unauthorized_response)
        except RefreshToken.DoesNotExist:
            return AnonymousUser(), delete_cookies(unauthorized_response)

        return super().authenticate(request)
