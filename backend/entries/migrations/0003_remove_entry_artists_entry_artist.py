# Generated by Django 4.2.16 on 2024-11-25 23:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('entries', '0002_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='entry',
            name='artists',
        ),
        migrations.AddField(
            model_name='entry',
            name='artist',
            field=models.CharField(default=None, max_length=255),
        ),
    ]
