from django.shortcuts import render
from rest_framework import generics
from .models import Contest, UserInContest
from .serializers import ContestSerializer

# Create your views here.


class ContestsList(generics.ListCreateAPIView):
    name = "contests"
    serializer_class = ContestSerializer
    queryset = Contest.objects.all()


class ContestDetail(generics.RetrieveUpdateDestroyAPIView):
    name = "contest-detail"
    serializer_class = ContestSerializer
    queryset = Contest.objects.all()


class UsersContests(generics.ListCreateAPIView):
    name = "users-contests"
    serializer_class = ContestSerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        user_contests = UserInContest.objects.filter(user=pk)
        return Contest.objects.filter(id__in=user_contests)
