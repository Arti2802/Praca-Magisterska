from django.urls import path, include
from .views import CustomAuthToken, UsersInContest, UsersInContestPost

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('authtoken/', include('djoser.urls.authtoken')),
    path('login/', CustomAuthToken.as_view()),
    path('contests/<int:pk>/users/', UsersInContest.as_view(), name=UsersInContest.name),
    path('usersincontests/', UsersInContestPost.as_view(), name=UsersInContestPost.name)
]
