# Generated by Django 4.1.9 on 2023-05-28 08:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0016_remove_projectline_bank_name_eng'),
    ]

    operations = [
        migrations.AddField(
            model_name='projectline',
            name='bank_name_eng',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
