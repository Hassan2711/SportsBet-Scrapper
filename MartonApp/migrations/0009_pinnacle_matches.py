# Generated by Django 5.0.8 on 2024-08-22 16:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MartonApp', '0008_live_matches'),
    ]

    operations = [
        migrations.CreateModel(
            name='pinnacle_matches',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('team', models.CharField(max_length=500)),
                ('sport', models.TextField(max_length=500)),
                ('odds', models.DecimalField(decimal_places=5, max_digits=10)),
            ],
        ),
    ]
