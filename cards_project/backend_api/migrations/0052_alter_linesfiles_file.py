# Generated by Django 4.1.9 on 2023-06-10 14:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0051_alter_linesfiles_file_extension_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='linesfiles',
            name='file',
            field=models.FileField(upload_to='upload_LinesFiles'),
        ),
    ]
