from django.shortcuts import render
from rest_framework import generics
from .models import User
from .serializers import UserSerializer

# Create your views here.


class UsersList(generics.ListCreateAPIView):
    name = "users"
    serializer_class = UserSerializer
    queryset = User.objects.all()


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    name = "user-detail"
    serializer_class = UserSerializer
    queryset = User.objects.all()
