# Generated by Django 4.1.9 on 2023-06-18 05:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0074_alter_processdata_step_comment'),
    ]

    operations = [
        migrations.RenameField(
            model_name='projectline',
            old_name='card_quality',
            new_name='card_qty',
        ),
        migrations.RenameField(
            model_name='projectline',
            old_name='card_quality_fact',
            new_name='card_qty_fact',
        ),
    ]
