# Generated by Django 3.1.2 on 2020-10-13 05:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='searchrecord',
            name='ip_address',
            field=models.GenericIPAddressField(blank=True, null=True),
        ),
    ]
