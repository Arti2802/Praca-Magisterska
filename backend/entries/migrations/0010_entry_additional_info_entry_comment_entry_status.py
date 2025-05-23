# Generated by Django 4.2.16 on 2025-04-30 20:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('entries', '0009_alter_entryinphase_running_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='entry',
            name='additional_info',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='entry',
            name='comment',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='entry',
            name='status',
            field=models.IntegerField(choices=[(None, 'Do rozpatrzenia'), (0, 'Rejected'), (1, 'Accepted')], null=True),
        ),
    ]
