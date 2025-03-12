from django.urls import path
from .views import EntriesList, EntryDetail, EntriesInEdition, EntriesInPhase, Results

urlpatterns = [
    path('entries/', EntriesList.as_view(), name=EntriesList.name),
    path('entries/<int:pk>/', EntryDetail.as_view(), name=EntryDetail.name),
    path('editions/<int:pk>/entries/', EntriesInEdition.as_view(), name=EntriesInEdition.name),
    path('phases/<int:pk>/entries/', EntriesInPhase.as_view(), name=EntriesInPhase.name),
    path('phases/<int:pk>/results/', Results.as_view(), name=Results.name),
]
