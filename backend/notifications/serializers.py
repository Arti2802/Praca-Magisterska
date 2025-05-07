from rest_framework import serializers
from .models import Notification
from django_q.models import Schedule
from contests.serializers import ContestSerializer


class NotificationSerializer(serializers.ModelSerializer):
    contest = ContestSerializer(read_only=True)

    class Meta:
        model = Notification
        fields = '__all__'


class ScheduleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Schedule
        fields = '__all__'
