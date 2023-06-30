# Generated by Django 4.2 on 2023-05-22 05:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0004_chips_datasheets_statuses_testkeys_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='banks',
            old_name='country_id',
            new_name='country',
        ),
        migrations.RenameField(
            model_name='banks',
            old_name='host_id',
            new_name='host',
        ),
        migrations.RenameField(
            model_name='banks',
            old_name='processing_id',
            new_name='processing',
        ),
        migrations.RenameField(
            model_name='chipdatasheets',
            old_name='datasheet_id',
            new_name='datasheet',
        ),
        migrations.RenameField(
            model_name='chips',
            old_name='test_key_id',
            new_name='test_key',
        ),
        migrations.RenameField(
            model_name='hosts',
            old_name='country_id',
            new_name='country',
        ),
        migrations.RenameField(
            model_name='processing',
            old_name='country_id',
            new_name='country',
        ),
        migrations.AddField(
            model_name='chips',
            name='chip_color',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
