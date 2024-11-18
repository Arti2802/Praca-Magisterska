from django.shortcuts import render
from rest_framework import generics
from .models import Edition
from .serializers import EditionSerializer

# Create your views here.


class EditionDetail(generics.RetrieveUpdateDestroyAPIView):
    name = "edition-detail"
    serializer_class = EditionSerializer
    queryset = Edition.objects.all()


class EditionsInContest(generics.ListCreateAPIView):
    name = "editions-in-contest"
    serializer_class = EditionSerializer

    def get_queryset(self):
        return Edition.objects.filter(contest=self.kwargs.get('pk'))
