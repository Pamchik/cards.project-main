# Generated by Django 4.1.9 on 2023-06-16 08:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0072_remove_processdata_modified_by_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='processdata',
            name='step_comment',
            field=models.TextField(null=True),
        ),
    ]
