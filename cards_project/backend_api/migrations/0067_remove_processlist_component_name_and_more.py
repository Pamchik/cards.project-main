# Generated by Django 4.1.9 on 2023-06-15 06:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0066_processlist_component_name_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='processlist',
            name='component_name',
        ),
        migrations.RemoveField(
            model_name='processlist',
            name='position_number',
        ),
    ]