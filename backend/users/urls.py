from django.urls import path
from .views import UsersList, UserDetail

urlpatterns = [
    path('users/', UsersList.as_view(), name=UsersList.name),
    path('users/<int:pk>/', UserDetail.as_view(), name=UserDetail.name),
]
