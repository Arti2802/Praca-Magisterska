from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from .serializers import EntrySerializer, EntryInPhaseSerializer, \
    EntryInSemifinalSerializer, EntryInFinalSerializer, EntryReprSerializer
from .models import Entry, EntryInPhase, EntryInSemifinal, EntryInFinal
from phases.models import Phase, Semifinal, Final
from rest_framework.views import APIView
from votes.models import Vote
from rest_framework import status

# Create your views here.


class EntriesList(generics.ListCreateAPIView):
    name = "entries"
    serializer_class = EntrySerializer
    queryset = Entry.objects.all()
    filterset_fields = ['status']


class EntryDetail(generics.RetrieveUpdateDestroyAPIView):
    name = "entry-detail"
    serializer_class = EntrySerializer
    queryset = Entry.objects.all()


class EntriesInEdition(generics.ListCreateAPIView):
    name = "entries-in-edition"
    serializer_class = EntryReprSerializer
    filterset_fields = ['status']

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        return Entry.objects.filter(edition=pk)


class Applications(generics.ListCreateAPIView):
    name = "applications"
    serializer_class = EntryReprSerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        return Entry.objects.filter(edition=pk, status__isnull=True)


class EntriesInPhase(generics.ListCreateAPIView):
    name = "entries-in-phase"
    serializer_class = EntryInPhaseSerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        if not EntryInFinal.objects.filter(final=pk).exists():
            return EntryInSemifinal.objects.filter(semifinal=pk)
        return EntryInFinal.objects.filter(final=pk)


class RunningOrder(generics.ListCreateAPIView):
    name = "running-order"
    serializer_class = EntryInPhaseSerializer
    ordering = ['running_order']

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        if not EntryInFinal.objects.filter(final=pk).exists():
            return EntryInSemifinal.objects.filter(semifinal=pk, running_order__isnull=False)
        return EntryInFinal.objects.filter(final=pk, running_order__isnull=False)


class EntriesInSemifinal(generics.ListCreateAPIView):
    name = "entries-in-semifinal"
    serializer_class = EntryInSemifinalSerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        return EntryInSemifinal.objects.filter(semifinal=pk)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EntryInSemifinalDetail(generics.RetrieveUpdateDestroyAPIView):
    name = "entry-in-semifinal"
    serializer_class = EntryInSemifinalSerializer
    queryset = EntryInSemifinal.objects.all()


class EntriesInFinal(generics.ListCreateAPIView):
    name = "entries-in-final"
    serializer_class = EntryInFinalSerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        return EntryInFinal.objects.filter(final=pk)


class Results(APIView):
    name = 'phase-results'

    def get(self, request, pk):
        data = []
        if Semifinal.objects.filter(id=pk).exists():
            entries_in_phase = EntryInSemifinal.objects.filter(semifinal=pk)
        else:
            entries_in_phase = EntryInFinal.objects.filter(final=pk)
        for entry in entries_in_phase:
            votes = Vote.objects.filter(entry=entry)
            results = sum([vote.points for vote in votes])
            data.append({
                'id': entry.id,
                'song': str(entry.entry),
                'points': results,
            })
        return Response(data, 200)
