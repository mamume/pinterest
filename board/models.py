from django.db import models

from pin.models import Pin
from user_profile.models import Profile


class Board(models.Model):
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    share = models.BooleanField(default=False)
    description = models.TextField(null=True, blank=True)
    cover_img = models.ImageField(
        upload_to="board/covers", null=True, blank=True)

    pins = models.ManyToManyField(Pin, blank=True)
    collaborators = models.ManyToManyField('Collaborator', blank=True)
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.title


class Collaborator(models.Model):
    is_super = models.BooleanField(default=False)
    can_invite = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.user.username


class Note(models.Model):
    title = models.CharField(max_length=255)
    text = models.TextField(null=True, blank=True)
    checkList = models.JSONField(null=True, blank=True)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.title


class Section(models.Model):
    name = models.CharField(max_length=255)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.name
