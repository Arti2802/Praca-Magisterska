from django.urls import path
from .views import EntriesList, EntryDetail, EntriesInEdition

urlpatterns = [
    path('entries/', EntriesList.as_view(), name=EntriesList.name),
    path('entries/<int:pk>/', EntryDetail.as_view(), name=EntryDetail.name),
    path('editions/<int:pk>/entries/', EntriesInEdition.as_view(), name=EntriesInEdition.name),
]
