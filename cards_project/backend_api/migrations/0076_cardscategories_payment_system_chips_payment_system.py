# Generated by Django 4.1.9 on 2023-06-20 10:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0075_rename_card_quality_projectline_card_qty_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='cardscategories',
            name='payment_system',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='backend_api.paymentsystems'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='chips',
            name='payment_system',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='backend_api.paymentsystems'),
            preserve_default=False,
        ),
    ]
