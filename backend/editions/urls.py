from django.urls import path
from .views import EditionsList, EditionDetail, EditionsInContest, UsersEditions, UsersContestsEditions

urlpatterns = [
    path('editions/', EditionsList.as_view(), name=EditionsList.name),
    path('editions/<int:pk>/', EditionDetail.as_view(), name=EditionDetail.name),
    path('contests/<int:pk>/editions/', EditionsInContest.as_view(), name=EditionsInContest.name),
    path('users/<int:pk>/editions/', UsersEditions.as_view(), name=UsersEditions.name),
    path('users/<int:pk>/contests/<int:pk2>/editions', UsersContestsEditions.as_view(),
         name=UsersContestsEditions.name),
]
