# Generated by Django 4.1.9 on 2023-06-06 07:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0042_alter_inputpicfiles_created_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inputpicfiles',
            name='created_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
