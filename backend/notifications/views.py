from django.shortcuts import render
from rest_framework import generics
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

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        return Notification.objects.filter(user=pk)


class ScheduleList(generics.ListAPIView):
    name = 'schedule'
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
