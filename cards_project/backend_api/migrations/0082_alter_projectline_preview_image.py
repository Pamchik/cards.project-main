# Generated by Django 4.1.9 on 2023-06-29 03:47

import backend_api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0081_alter_projectline_preview_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectline',
            name='preview_image',
            field=models.FileField(blank=True, default='/Превью/Empty.png', max_length=250, null=True, upload_to=backend_api.models.ProjectLine.upload_PreviewFiles),
        ),
    ]
