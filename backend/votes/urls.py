from django.urls import path
from .views import VotesList, UsersVotes

urlpatterns = [
    path('votes/', VotesList.as_view(), name=VotesList.name),
    path('users/<int:pk>/votes/', UsersVotes.as_view(), name=UsersVotes.name),
]
