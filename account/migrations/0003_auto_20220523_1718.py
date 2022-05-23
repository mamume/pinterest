# Generated by Django 3.2.9 on 2022-05-23 15:18

from django.db import migrations, models
import django.db.models.deletion
import django.db.models.expressions
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_profile'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserFollowing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_follow', models.DateTimeField(default=django.utils.timezone.now)),
                ('followed_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='follower', to='account.profile')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='following', to='account.profile')),
            ],
            options={
                'verbose_name_plural': 'Users Following System',
                'ordering': ['-start_follow'],
            },
        ),
        migrations.AddConstraint(
            model_name='userfollowing',
            constraint=models.UniqueConstraint(fields=('user', 'followed_user'), name='unique_followers'),
        ),
        migrations.AddConstraint(
            model_name='userfollowing',
            constraint=models.CheckConstraint(check=models.Q(('user', django.db.models.expressions.F('followed_user')), _negated=True), name="users can't follow them selves"),
        ),
    ]
