# Generated by Django 4.2 on 2023-04-13 08:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0009_alter_useraddress_mobile'),
    ]

    operations = [
        migrations.RenameField(
            model_name='useraddress',
            old_name='address',
            new_name='description',
        ),
    ]
