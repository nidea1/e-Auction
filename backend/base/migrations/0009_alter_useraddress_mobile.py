# Generated by Django 4.2 on 2023-04-13 05:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_useraddress_district'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraddress',
            name='mobile',
            field=models.CharField(blank=True, max_length=12, null=True),
        ),
    ]
