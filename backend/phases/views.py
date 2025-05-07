from django.shortcuts import render
from rest_framework import generics
from .models import Phase, Semifinal, Final
from editions.models import Edition
from .serializers import PhaseSerializer, SemifinalSerializer, FinalSerializer

# Create your views here.


class PhasesList(generics.ListCreateAPIView):
    name = "phases"
    serializer_class = PhaseSerializer
    queryset = Phase.objects.all()


class SemifinalsList(generics.ListCreateAPIView):
    name = "semifinals"
    serializer_class = SemifinalSerializer
    queryset = Semifinal.objects.all()


class FinalsList(generics.ListCreateAPIView):
    name = "finals"
    serializer_class = FinalSerializer
    queryset = Final.objects.all()


class PhaseDetail(generics.RetrieveUpdateDestroyAPIView):
    name = "phase-detail"
    serializer_class = PhaseSerializer
    queryset = Phase.objects.all()


class SemifinalDetail(generics.RetrieveUpdateDestroyAPIView):
    name = "semifinal-detail"
    serializer_class = SemifinalSerializer
    queryset = Semifinal.objects.all()


class FinalDetail(generics.RetrieveUpdateDestroyAPIView):
    name = "final-detail"
    serializer_class = FinalSerializer
    queryset = Final.objects.all()


class PhasesInContest(generics.ListAPIView):
    name = "phases-in-contest"

    def get_serializer_class(self):
        if isinstance(self, Semifinal):
            return SemifinalSerializer
        return FinalSerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        editions = Edition.objects.filter(contest=pk)
        return Phase.objects.filter(edition__in=editions)


class FinalsInContest(generics.ListAPIView):
    name = "finals-in-contest"
    serializer_class = FinalSerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        editions = Edition.objects.filter(contest=pk)
        return Final.objects.filter(edition__in=editions)


class SemifinalsInEdition(generics.ListAPIView):
    name = "phases-in-edition"
    serializer_class = SemifinalSerializer
    ordering = ['count']

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        return Semifinal.objects.filter(edition=pk)
