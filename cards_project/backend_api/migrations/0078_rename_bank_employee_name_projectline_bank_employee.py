# Generated by Django 4.1.9 on 2023-06-23 06:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0077_projectline_bank_employee_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='projectline',
            old_name='bank_employee_name',
            new_name='bank_employee',
        ),
    ]
