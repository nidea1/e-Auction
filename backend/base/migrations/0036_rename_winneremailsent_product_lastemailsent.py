# Generated by Django 4.2 on 2023-06-12 11:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0035_product_productstatus'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='winnerEmailSent',
            new_name='lastEmailSent',
        ),
    ]
