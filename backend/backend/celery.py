import os
from celery import Celery
from celery.schedules import crontab
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')
app.conf.enable_utc = False

app.conf.update(timezone= 'Europe/Istanbul')

app.config_from_object(settings, namespace='CELERY')

# Celery Beat Settings

app.conf.beat_schedule = {
    'check_every_ten_minutes': {
        'task': 'base.tasks.check_products_and_send_ending_email',
        'schedule': crontab(minute='*/10')
    },
    'another_check_every_ten_minutes': {
        'task': 'base.tasks.check_products_and_send_last_email',
        'schedule': crontab(minute='*/10')
    }
}

app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')
