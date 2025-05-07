from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from .models import Notification
from .serializers import NotificationSerializer, ScheduleSerializer
from django_q.models import Schedule

# Create your views here.


class NotificationsList(generics.ListCreateAPIView):
    name = 'notifications'
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer


class NotificationDetail(generics.RetrieveUpdateDestroyAPIView):
    name = 'notification-detail'
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer


class NotificationForUser(generics.ListAPIView):
    name = 'notifications-for-user'
    serializer_class = NotificationSerializer
    ordering = ['read', '-creation_date']

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        return Notification.objects.filter(user=pk)


class ReadNotifications(APIView):
    name = 'read-notification'

    def put(self, request, **kwargs):
        pk = kwargs.get('pk')
        Notification.objects.filter(user=pk).update(read=True)
        return Response({'status': 'odczytano wiadomości'}, status=HTTP_200_OK)


class ScheduleList(generics.ListAPIView):
    name = 'schedule'
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
