from django.contrib.auth.password_validation import validate_password
from django_countries.serializers import CountryFieldMixin
from rest_framework import serializers

from board.models import Board
from board.serializers import BoardSerializer
from pin.models import Pin
from pin.serializers import PinSerializer

from .models import Profile, UserFollowing


class ProfileSerializer(CountryFieldMixin, serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'gender', 'country', 'first_name', 'last_name', 'full_name', 'profile_pic', 'email',
                  'username', 'bio', 'following_count', 'followers_count', 'pins', 'boards', 'website']

    full_name = serializers.SerializerMethodField('get_full_name')
    following_count = serializers.SerializerMethodField('get_following_count')
    followers_count = serializers.SerializerMethodField('get_followers_count')
    pins = serializers.SerializerMethodField('get_pins')
    boards = serializers.SerializerMethodField('get_boards')
    username = serializers.SerializerMethodField('get_username')
    email = serializers.SerializerMethodField('get_email')

    def get_email(self, instance: Profile):
        return instance.user.email

    def get_boards(self, instance: Profile):
        serializer_context = {'request': self.context.get('request')}
        boards = Board.objects.filter(owner=instance)
        return BoardSerializer(boards, many=True, context=serializer_context).data

    def get_pins(self, instance: Profile):
        serializer_context = {'request': self.context.get('request')}
        pins = Pin.objects.filter(owner=instance)
        return PinSerializer(pins, many=True, context=serializer_context).data

    def get_full_name(self, instance: Profile):
        if instance.first_name or instance.last_name:
            return f"{instance.first_name} {instance.last_name}"
        else:
            return None

    def get_following_count(self, instance: Profile):
        return UserFollowing.objects.filter(user=instance).count()

    def get_followers_count(self, instance: Profile):
        return UserFollowing.objects.filter(followed_user=instance).count()

    def get_username(self, instance: Profile):
        return instance.user.username


class UserFollowersSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollowing
        fields = ['follower', ]

    follower = serializers.SerializerMethodField('get_follower')

    def get_follower(self, instance: UserFollowing):
        serializer_context = {'request': self.context.get('request')}
        followers = Profile.objects.filter(pk=instance.user.id)

        return FollowerData(followers, many=True, context=serializer_context).data


class UserFollowingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollowing
        fields = ['following', ]

    following = serializers.SerializerMethodField('get_following')

    def get_following(self, instance: UserFollowing):
        serializer_context = {'request': self.context.get('request')}
        following = Profile.objects.filter(pk=instance.followed_user.id)

        return FollowerData(following, many=True, context=serializer_context).data


class FollowerData(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'username', 'full_name', 'profile_pic']

    full_name = serializers.SerializerMethodField('get_full_name')
    username = serializers.SerializerMethodField('get_username')

    def get_username(self, instance: Profile):
        return instance.user.username

    def get_full_name(self, instance: Profile):
        if instance.first_name or instance.last_name:
            return f"{instance.first_name} {instance.last_name}"
        else:
            return instance.user.username


class PinDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pin
        fields = '__all__'


class ProfileUpdateSerializer(CountryFieldMixin, serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'profile_pic', 'first_name', 'last_name', 'bio',
                  'website', 'username', 'email', 'country', 'gender']

    username = serializers.SerializerMethodField('get_username')
    email = serializers.SerializerMethodField('get_email')

    def get_username(self, instance: Profile):
        return instance.user.username

    def get_email(self, instance: Profile):
        return instance.user.email

    def update(self, instance: Profile, validated_data):
        if (self.context.get('username')):
            instance.user.username = self.context.get('username')

        if (self.context.get('email')):
            instance.user.email = self.context.get('email')

        instance.user.save()
        return super().update(instance, validated_data)


class UpdatePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_old_password(self, value):
        user = self.context.get('request').user
        if not user.check_password(value):
            raise serializers.ValidationError('check old password again')

    def validate_new_password(self, value):
        try:
            validate_password(value, self.context['request'].user)
        except Exception as e:
            raise serializers.ValidationError(str(e))
        return value

    def save(self, **kwargs):
        password = self.validated_data['new_password']
        user = self.context['request'].user
        user.set_password(password)
        user.save()
        return user
