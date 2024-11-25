from django.urls import path
from .views import EntryDetail, EntriesInEdition

urlpatterns = [
    path('entries/<int:pk>/', EntryDetail.as_view(), name=EntryDetail.name),
    path('editions/<int:pk>/entries/', EntriesInEdition.as_view(), name=EntriesInEdition.name),
]
