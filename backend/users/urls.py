from django.urls import path, include
from .views import CustomAuthToken, UsersInContest, UserInContestProfile, UsersInContestPost, UsersInContestDetail

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('authtoken/', include('djoser.urls.authtoken')),
    path('login/', CustomAuthToken.as_view()),
    path('contests/<int:pk>/users/', UsersInContest.as_view(), name=UsersInContest.name),
    path('contests/<int:cont_pk>/users/<int:user_pk>/', UserInContestProfile.as_view(), name=UserInContestProfile.name),
    path('usersincontests/', UsersInContestPost.as_view(), name=UsersInContestPost.name),
    path('usersincontests/<int:pk>/', UsersInContestDetail.as_view(), name=UsersInContestDetail.name),
]
