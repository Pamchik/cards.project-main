# Generated by Django 4.1.9 on 2023-06-10 11:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0050_delete_projectinputpicfiles'),
    ]

    operations = [
        migrations.AlterField(
            model_name='linesfiles',
            name='file_extension',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='linesfiles',
            name='line_type',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='linesfiles',
            name='process_step',
            field=models.CharField(max_length=255),
        ),
    ]
