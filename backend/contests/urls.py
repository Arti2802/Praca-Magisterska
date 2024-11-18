from django.urls import path
from .views import ContestsList, ContestDetail

urlpatterns = [
    path('contests/', ContestsList.as_view(), name=ContestsList.name),
    path('contests/<int:pk>/', ContestDetail.as_view(), name=ContestDetail.name),
]
