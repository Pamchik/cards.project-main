# Generated by Django 4.1.9 on 2023-06-11 15:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0056_projectline_card_category_projectline_card_code_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='projectline',
            name='bank_communication',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='projectline',
            name='card_effects',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='projectline',
            name='card_quality',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='projectline',
            name='card_quality_fact',
            field=models.IntegerField(blank=True, default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='projectline',
            name='chip',
            field=models.ForeignKey(blank=True, default=1, on_delete=django.db.models.deletion.CASCADE, to='backend_api.chips'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='projectline',
            name='chip_color',
            field=models.ForeignKey(blank=True, default=1, on_delete=django.db.models.deletion.CASCADE, to='backend_api.chipcolors'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='projectline',
            name='general_comment',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='projectline',
            name='magstripe_color',
            field=models.ForeignKey(blank=True, default=1, on_delete=django.db.models.deletion.CASCADE, to='backend_api.magstripecolors'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='projectline',
            name='material_color',
            field=models.ForeignKey(blank=True, default=1, on_delete=django.db.models.deletion.CASCADE, to='backend_api.plasticcolors'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='projectline',
            name='material_type',
            field=models.ForeignKey(blank=True, default=1, on_delete=django.db.models.deletion.CASCADE, to='backend_api.plastictypes'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='projectline',
            name='vendor_communication',
            field=models.TextField(blank=True),
        ),
    ]
