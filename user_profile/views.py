from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from pin.models import Pin

from .models import Profile, User, UserFollowing
from .serializers import (PinDeleteSerializer, ProfileSerializer,
                          ProfileUpdateSerializer, UpdatePasswordSerializer,
                          UserFollowersSerializer, UserFollowingSerializer)


@permission_classes([])
class ProfileViewSet(ModelViewSet):
    serializer_class = ProfileSerializer

    def get_queryset(self):
        username = self.request.query_params.get('username')
        if username:
            return Profile.objects.filter(user__username=username)

        return Profile.objects.filter(user=self.request.user.id)

    def get_serializer_context(self):
        return {'request': self.request}


class ProfileDetailsViewSet(ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    def get_serializer_context(self):
        return {'request': self.request}


@api_view(['GET'])
def follow(request, u_id):
    current_profile = Profile.objects.get(user=request.user)

    try:
        f_user = get_object_or_404(Profile, id=u_id)

        follow = UserFollowing.objects.create(
            user=current_profile, followed_user=f_user)
        return Response(data={'msg': follow.__str__()}, status=status.HTTP_201_CREATED)
    except:
        return Response(data={'msg': 'user not found'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def unfollow(request, u_id):
    current_profile = Profile.objects.get(user__username=request.user)

    try:
        f_user = get_object_or_404(Profile, id=u_id)
        try:
            UserFollowing.objects.get(
                user=current_profile, followed_user=f_user).delete()
            return Response(data={'msg': f"{request.user} unfollowed {f_user.user.username}"}, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response(data={'msg': 'user not found'}, status=status.HTTP_400_BAD_REQUEST)


class FollowersViewSet(ModelViewSet):
    serializer_class = UserFollowersSerializer

    def get_queryset(self):
        current_profile = Profile.objects.get(user=self.request.user)
        username = self.request.query_params.get('username')
        if username:
            follower = get_object_or_404(Profile, user__username=username)
            return UserFollowing.objects.filter(followed_user=follower)

        return UserFollowing.objects.filter(followed_user=current_profile)

    def get_serializer_context(self):
        return {"request": self.request}


class FollowingViewSet(ModelViewSet):
    serializer_class = UserFollowingSerializer

    def get_queryset(self):
        username = self.request.query_params.get('username')
        current_profile = Profile.objects.get(user__username=self.request.user)

        if username:
            following = get_object_or_404(Profile, user__username=username)
            return UserFollowing.objects.filter(user=following)

        return UserFollowing.objects.filter(user=current_profile)

    def get_serializer_context(self):
        return {"request": self.request}


class PinDeleteViewSet(ModelViewSet):
    serializer_class = PinDeleteSerializer
    queryset = Pin.objects.all()


class ProfileUpdateViewSet(ModelViewSet):
    serializer_class = ProfileUpdateSerializer

    def get_queryset(self):
        return Profile.objects.filter(user__username=self.request.user)

    def get_serializer_context(self):
        return {
            'username': self.request.data.get('username'),
            'email': self.request.data.get('email'),
        }


@api_view(['DELETE'])
def delete_user(request):
    try:
        User.objects.get(username=request.user).delete()
        return Response(data={'msg': 'account deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        return Response(data={'msg': f"error while delete {e}"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_password(request):
    serializer = UpdatePasswordSerializer(
        data=request.data, context={'request': request})

    if serializer.is_valid():
        serializer.save()
        return Response(data={'msg': 'password changed successfully'}, status=status.HTTP_200_OK)

    return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
