# Generated by Django 4.1.9 on 2023-06-08 11:03

import backend_api.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0044_inputpicfiles_status'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProjectInputPicFiles',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(blank=True, null=True, upload_to=backend_api.models)),
                ('name', models.CharField(max_length=255)),
                ('file_extension', models.CharField(blank=True, max_length=255)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(default='Активен', max_length=255)),
                ('project_line', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend_api.projectline')),
            ],
        ),
        migrations.DeleteModel(
            name='InputPicFiles',
        ),
    ]
