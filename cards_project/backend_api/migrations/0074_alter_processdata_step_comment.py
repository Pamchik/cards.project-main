# Generated by Django 4.1.9 on 2023-06-16 08:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0073_alter_processdata_step_comment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='processdata',
            name='step_comment',
            field=models.TextField(blank=True, null=True),
        ),
    ]
