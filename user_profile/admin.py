from django.contrib import admin

from .models import Profile, User, UserFollowing

admin.site.register(User)
admin.site.register(Profile)
admin.site.register(UserFollowing)
