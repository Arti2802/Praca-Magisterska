from django.shortcuts import render
from rest_framework import generics
from .models import Edition, UserInEdition
from users.models import UserInContest
from .serializers import EditionSerializer

# Create your views here.


class EditionsList(generics.ListCreateAPIView):
    name = "editions"
    serializer_class = EditionSerializer
    queryset = Edition.objects.all()
    filterset_fields = ['actual']


class EditionDetail(generics.RetrieveUpdateDestroyAPIView):
    name = "edition-detail"
    serializer_class = EditionSerializer
    queryset = Edition.objects.all()


class EditionsInContest(generics.ListCreateAPIView):
    name = "editions-in-contest"
    serializer_class = EditionSerializer
    filterset_fields = ['actual']
    ordering_fields = ['count']

    def get_queryset(self):
        return Edition.objects.filter(contest=self.kwargs.get('pk'))


class UsersEditions(generics.ListAPIView):
    name = "users-editions"
    serializer_class = EditionSerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        user_edition = UserInEdition.objects.filter(user=pk)
        return Edition.objects.filter(id__in=user_edition)


class UsersContestsEditions(generics.ListAPIView):
    name = "users-contests-editions"
    serializer_class = EditionSerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        pk2 = self.kwargs.get('pk2')
        user_edition = UserInContest.objects.filter(user=pk, contest=pk2)
        return Edition.objects.filter(contest__in=user_edition)
