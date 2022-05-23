from django.contrib.auth.models import AbstractUser
from django.db import models
from django_countries.fields import CountryField


# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    join_date = models.DateTimeField(auto_now_add=True)
    gender = models.CharField(max_length=6, blank=True, null=True)
    country = CountryField(blank=True, null=True)
    profile_pic = models.ImageField(
        upload_to='account/profile_pics', null=True, blank=True)
    website = models.URLField(null=True, blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username


class UserFollowing(models.Model):
    user = models.ForeignKey(
        Profile, related_name='following', on_delete=models.CASCADE)
    followed_user = models.ForeignKey(
        Profile, related_name='follower', on_delete=models.CASCADE)
    start_follow = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'followed_user'], name='unique_followers'),
            models.CheckConstraint(
                check=~models.Q(user=models.F('followed_user')), name="users can't follow them selves"
            ), ]
        ordering = ['-start_follow']
        verbose_name_plural = 'Users Following System'

    def __str__(self):
        return f"{self.user} start following {self.followed_user}"
