# Generated by Django 4.2 on 2023-05-30 11:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0030_product_ending_email_sent'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bid',
            name='product',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='bidders', to='base.product'),
        ),
    ]
