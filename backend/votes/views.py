from django.shortcuts import render
from rest_framework import generics
from .serializers import VoteSerializer
from .models import Vote
from rest_framework.response import Response
from rest_framework import status

# Create your views here.


class VotesList(generics.ListCreateAPIView):
    name = "votes"
    serializer_class = VoteSerializer
    queryset = Vote.objects.all()
    filterset_fields = ['points', 'entry']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UsersVotes(generics.ListAPIView):
    name = "users-votes"
    serializer_class = VoteSerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        return Vote.objects.filter(user=pk)
