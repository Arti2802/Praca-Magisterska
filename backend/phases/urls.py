from django.urls import path
from .views import *

urlpatterns = [
    path('phases/', PhasesList.as_view(), name=PhasesList.name),
    path('phases/<int:pk>/', PhaseDetail.as_view(), name=PhaseDetail.name),
    path('semifinals/', SemifinalsList.as_view(), name=SemifinalsList.name),
    path('semifinals/<int:pk>/', SemifinalDetail.as_view(), name=SemifinalDetail.name),
    path('finals/', FinalsList.as_view(), name=FinalsList.name),
    path('finals/<int:pk>/', FinalDetail.as_view(), name=FinalDetail.name),
    path('contests/<int:pk>/phases/', PhasesInContest.as_view(), name=PhasesInContest.name),
    path('editions/<int:pk>/phases/', PhasesInEdition.as_view(), name=PhasesInEdition.name),
]