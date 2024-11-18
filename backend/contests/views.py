from django.shortcuts import render
from rest_framework import generics
from .models import Contest
from .serializers import ContestSerializer

# Create your views here.


class ContestsList(generics.ListCreateAPIView):
    name = "contests"
    queryset = Contest.objects.all()
    serializer_class = ContestSerializer


class ContestDetail(generics.RetrieveUpdateDestroyAPIView):
    name = "edition-detail"
    serializer_class = ContestSerializer
    queryset = Contest.objects.all()
