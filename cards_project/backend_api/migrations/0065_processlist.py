# Generated by Django 4.1.9 on 2023-06-15 06:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0064_alter_projectline_preview_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProcessList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url_name', models.CharField(max_length=255)),
            ],
        ),
    ]
