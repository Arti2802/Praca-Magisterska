from django.urls import path
from .views import EditionDetail, EditionsInContest

urlpatterns = [
    path('editions/<int:pk>/', EditionDetail.as_view(), name=EditionDetail.name),
    path('contests/<int:pk>/editions/', EditionsInContest.as_view(), name=EditionsInContest.name),
]
