# Generated by Django 4.1.9 on 2023-06-28 11:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0080_alter_projectline_bank_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectline',
            name='preview_image',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
