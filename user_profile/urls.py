from django.urls import include, path
from rest_framework import urlpatterns
from rest_framework.routers import SimpleRouter

from . import views

router = SimpleRouter()
router.register('list', views.ProfileViewSet, basename='profile-list')
router.register('details', views.ProfileDetailsViewSet,
                basename='profile-details')
router.register('update', views.ProfileUpdateViewSet,
                basename='profile-update')
router.register('followers', views.FollowersViewSet, basename='followers-list')
router.register('following', views.FollowingViewSet, basename='following-list')
# router.register('pins-delete', views.PinDeleteViewSet, basename='pins-delete')

urlpatterns = router.urls + [
    path('follow/<int:u_id>', views.follow, name='follow'),
    path('unfollow/<int:u_id>', views.unfollow, name='unfollow'),
    path('delete', views.delete_user, name='delete-user'),
    path('update-password', views.update_password, name='update-password'),
]
