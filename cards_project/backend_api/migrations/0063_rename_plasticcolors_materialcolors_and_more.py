# Generated by Django 4.1.9 on 2023-06-11 16:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0062_alter_projectline_bank_communication_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='PlasticColors',
            new_name='MaterialColors',
        ),
        migrations.RenameModel(
            old_name='PlasticTypes',
            new_name='MaterialTypes',
        ),
    ]
