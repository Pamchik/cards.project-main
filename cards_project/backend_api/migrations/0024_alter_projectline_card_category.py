# Generated by Django 4.1.9 on 2023-05-29 08:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0023_delete_bankname'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectline',
            name='card_category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='backend_api.cardscategories'),
        ),
    ]
