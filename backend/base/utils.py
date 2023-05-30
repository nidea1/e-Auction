from django.contrib.auth.tokens import PasswordResetTokenGenerator
import six

from django.core.mail import EmailMessage

class AccountActivationTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (
            six.text_type(user.id) + six.text_type(timestamp) + six.text_type(user.is_active)
        )

activation_token = AccountActivationTokenGenerator()

from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes

def send_verification_email(request, user):
    mail_subject = 'Activate your user account.'
    message = render_to_string('activate_email.html', {
        'user': user.first_name,
        'domain': 'localhost:3000',
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': activation_token.make_token(user),
        'protocol': 'https' if request.is_secure() else 'http'
    })

    email = EmailMessage(
        mail_subject,
        message, 
        'info@nidea1.com.tr',
        [user.email]
    )
    email.content_subtype = 'html'
    email.send()

def send_ending_email(user, product):
    mail_subject = 'Product is ending soon!'
    message = render_to_string('ending_email.html', {
        'user': user.first_name,
        'product': product.name,
        'slug': product.slug,
        'id': product._id,
        'price': product.currentHighestBid,
        'description': product.description,
        'image': product.images.first(),
        'domain': 'localhost:3000',
        'protocol': 'http'
    })

    email = EmailMessage(
        mail_subject,
        message,
        'info@nidea1.com.tr',
        [user.email]
    )
    email.content_subtype = 'html'
    email.send()
