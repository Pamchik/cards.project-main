# Generated by Django 4.1.9 on 2023-06-01 10:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0035_projectline_magstr_color'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='projectline',
            name='magstr_color',
        ),
    ]
