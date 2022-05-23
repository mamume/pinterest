from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

from user_profile.models import Profile


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_profile_on_creating_user(sender, **kwargs):
    if kwargs['created']:
        Profile.objects.create(user=kwargs['instance'])
