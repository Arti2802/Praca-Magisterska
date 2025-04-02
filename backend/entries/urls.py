from django.urls import path
from .views import *

urlpatterns = [
    path('entries/', EntriesList.as_view(), name=EntriesList.name),
    path('entries/<int:pk>/', EntryDetail.as_view(), name=EntryDetail.name),
    path('editions/<int:pk>/entries/', EntriesInEdition.as_view(), name=EntriesInEdition.name),
    path('phases/<int:pk>/entries/', EntriesInPhase.as_view(), name=EntriesInPhase.name),
    path('semifinals/<int:pk>/entries/', EntriesInSemifinal.as_view(), name=EntriesInSemifinal.name),
    path('semifinals/<int:pk>/entries/<int:pk2>/', EntryInSemifinalDetail.as_view(), name=EntryInSemifinalDetail.name),
    path('finals/<int:pk>/entries/', EntriesInFinal.as_view(), name=EntriesInFinal.name),
    path('phases/<int:pk>/results/', Results.as_view(), name=Results.name),
]
