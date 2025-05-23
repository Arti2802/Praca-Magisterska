# Generated by Django 4.2.16 on 2025-03-27 23:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('entries', '0004_entryinphase'),
    ]

    operations = [
        migrations.CreateModel(
            name='EntryInFinal',
            fields=[
                ('entryinphase_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='entries.entryinphase')),
            ],
            bases=('entries.entryinphase',),
        ),
        migrations.CreateModel(
            name='EntryInSemifinal',
            fields=[
                ('entryinphase_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='entries.entryinphase')),
            ],
            bases=('entries.entryinphase',),
        ),
    ]
