# Generated by Django 4.2 on 2023-06-23 12:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0043_order_shippingcompany'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='price',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
