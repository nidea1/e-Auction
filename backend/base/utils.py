from django.contrib.auth.tokens import PasswordResetTokenGenerator
import six
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from dotenv import load_dotenv
import os
load_dotenv()

from .models import Order


class AccountActivationTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (
            six.text_type(user.id) + six.text_type(timestamp) + six.text_type(user.is_active)
        )


def send_email(mail_subject, message, user):
    email = EmailMessage(
        mail_subject,
        message, 
        'info@nidea1.com.tr',
        [user.email]
    )
    email.content_subtype = 'html'
    email.send()


def send_verification_email(request, user):
    activation_token = AccountActivationTokenGenerator()
    mail_subject = 'Activate your user account.'
    message = render_to_string('activate_email.html', {
        'user': user.first_name,
        'domain': os.environ.get('BASE_DOMAIN'),
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': activation_token.make_token(user),
        'protocol': 'https' if request.is_secure() else 'http'
    })

    send_email(mail_subject, message, user)


def product_email_context(user, product):
    return {
        'user': user.first_name,
        'product': product.name,
        'slug': product.slug,
        'id': product._id,
        'price': product.currentHighestBid,
        'description': product.description,
        'image': product.images.first(),
        'domain': os.environ.get('BASE_DOMAIN'),
        'protocol': 'http'
    }


def send_ending_email(user, product):
    mail_subject = 'Product is ending soon!'
    message_context = product_email_context(user, product)
    message = render_to_string('ending_email.html', message_context)

    send_email(mail_subject, message, user)


def send_winner_email(user, product):
    mail_subject = f'Congratulations! You win this product: {product.name}'
    message_context = product_email_context(user, product)
    message = render_to_string('winner_email.html', message_context)

    send_email(mail_subject, message, user)


def send_loser_email(user, product):
    mail_subject = f'We are sad! You lose this product: {product.name}'
    message_context = product_email_context(user, product)
    message = render_to_string('loser_email.html', message_context)

    send_email(mail_subject, message, user)


def delete_cookies(response):
    response.delete_cookie('refresh_token', samesite='None')
    response.delete_cookie('access_token', samesite='None')
    return response


def set_cookies(response):
    response.set_cookie('access_token', response.data['access_token'], httponly=True, samesite='None', expires=36000, secure=True)
    response.set_cookie('refresh_token', response.data['refresh_token'], httponly=True, samesite='None', secure=True)
    return response


def create_order(product, winner):
    new_order = Order.objects.create(
        buyer = winner,
        seller = product.user,
        product = product,
    )

    new_order.save()

    return "New order created."
