# Generated by Django 4.1.9 on 2023-05-27 15:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0009_remove_orderline_bank_name_eng_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='projectline',
            name='bank_name_eng',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='backend_api.bankname'),
        ),
    ]
