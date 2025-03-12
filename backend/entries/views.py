from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from .serializers import EntrySerializer, EntryInPhaseSerializer
from .models import Entry, EntryInPhase
from rest_framework.views import APIView
from votes.models import Vote

# Create your views here.


class EntriesList(generics.ListCreateAPIView):
    name = "entries"
    serializer_class = EntrySerializer
    queryset = Entry.objects.all()


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


class EntriesInPhase(generics.ListCreateAPIView):
    name = "entries-in-phase"
    serializer_class = EntryInPhaseSerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        return EntryInPhase.objects.filter(phase=pk)


class Results(APIView):
    name = 'phase-results'

    def get(self, request, pk):
        data = []
        entries_in_phase = EntryInPhase.objects.filter(phase=pk)
        entries = Entry.objects.filter(id__in=entries_in_phase)
        for entry in entries:
            votes = Vote.objects.filter(entry=entry)
            results = sum([vote.points for vote in votes])
            data.append({
                'id': entry.id,
                'song': str(entry),
                'points': results,
            })
        return Response(data, 200)
