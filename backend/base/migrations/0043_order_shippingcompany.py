# Generated by Django 4.2 on 2023-06-23 08:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0042_order_shippingcode'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='shippingCompany',
            field=models.CharField(blank=True, null=True),
        ),
    ]