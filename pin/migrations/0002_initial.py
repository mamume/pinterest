# Generated by Django 3.2.9 on 2022-05-27 04:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('pin', '0001_initial'),
        ('user_profile', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='pin',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user_profile.profile'),
        ),
        migrations.AddField(
            model_name='pin',
            name='section',
            field=models.ManyToManyField(through='pin.PinSection', to='pin.Section'),
        ),
    ]
