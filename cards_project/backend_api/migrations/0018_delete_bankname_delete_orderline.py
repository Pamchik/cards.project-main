# Generated by Django 4.1.9 on 2023-05-28 09:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0017_projectline_bank_name_eng'),
    ]

    operations = [
        migrations.DeleteModel(
            name='BankName',
        ),
        migrations.DeleteModel(
            name='OrderLine',
        ),
    ]
