# from rest_framework import request
from rest_framework.decorators import api_view, permission_classes
# from rest_framework.request import Request
# from rest_framework.utils import serializer_helpers
from rest_framework.viewsets import ModelViewSet

from .models import Profile
from .serializers import ProfileSerializer

# from pin.models import Pin


@permission_classes([])
class ProfileViewSet(ModelViewSet):
    serializer_class = ProfileSerializer

    def get_queryset(self):
        username = self.request.query_params.get('username')

        if username:
            return Profile.objects.filter(user__username=username)

        return Profile.objects.filter(user=self.request.user)


class ProfileDetailsViewSet(ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    def get_serializer_context(self):
        return {'request': self.request}


# class FollowersViewSet(ModelViewSet):
#     serializer_class = UserFollowersSerializer

#     def get_queryset(self):
#         username = self.request.query_params.get('username')
#         if username:
#             follower = Profile.objects.get(username=username)
#             return UserFollowing.objects.filter(followed_user=follower)

#         return UserFollowing.objects.filter(followed_user=self.request.user)

#     def get_serializer_context(self):
#         return {"request": self.request}


# class FollowingViewSet(ModelViewSet):
#     serializer_class = UserFolloweingSerializer

#     def get_queryset(self):
#         username = self.request.query_params.get('username')
#         if username:
#             following = Profile.objects.get(username=username)
#             return UserFollowing.objects.filter(user=following)

#         return UserFollowing.objects.filter(user=self.request.user)

#     def get_serializer_context(self):
#         return {"request": self.request}


# class PinDeleteViewSet(ModelViewSet):
#     serializer_class = PinDeleteSerializer
#     queryset = Pin.objects.all()


# class ProfileUpdateViewSet(ModelViewSet):
#     serializer_class = ProfileUpdateSerializer

#     def get_queryset(self):
#         return Profile.objects.filter(username=self.request.user)
