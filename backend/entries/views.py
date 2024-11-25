from django.shortcuts import render
from rest_framework import generics
from .serializers import EntrySerializer
from .models import Entry

# Create your views here.


class EntryDetail(generics.RetrieveUpdateDestroyAPIView):
    name = "entry-detail"
    serializer_class = EntrySerializer
    queryset = Entry.objects.all()


class EntriesInEdition(generics.ListCreateAPIView):
    name = "entries-in-edition"
    serializer_class = EntrySerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        return Entry.objects.filter(edition=pk)
