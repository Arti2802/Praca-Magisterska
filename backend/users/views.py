from django.shortcuts import render
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import generics
from .models import User, UserInContest
from .serializers import UserSerializer, UserInContestSerializer, UserInContestPostSerializer

# Create your views here.


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'id': user.pk,
        })


class UsersList(generics.ListCreateAPIView):
    name = "users"
    serializer_class = UserSerializer
    queryset = User.objects.all()


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    name = "user-detail"
    serializer_class = UserSerializer
    queryset = User.objects.all()


class UsersInContest(generics.ListCreateAPIView):
    name = "users-in-contest"
    serializer_class = UserInContestSerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        return UserInContest.objects.filter(contest=pk)


class UserInContestProfile(generics.ListAPIView):
    name = "user-in-contest-profile"
    serializer_class = UserInContestSerializer

    def get_queryset(self):
        contest = self.kwargs.get('cont_pk')
        user = self.kwargs.get('user_pk')
        return UserInContest.objects.filter(contest=contest, user=user)


class UsersInContestPost(generics.ListCreateAPIView):
    name = "users-in-contest"
    serializer_class = UserInContestPostSerializer
    queryset = UserInContest.objects.all()


class UsersInContestDetail(generics.RetrieveUpdateDestroyAPIView):
    name = "users-in-contest-detail"
    serializer_class = UserInContestPostSerializer
    queryset = UserInContest.objects.all()
