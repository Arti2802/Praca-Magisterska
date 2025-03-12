from rest_framework import serializers
from .models import Entry, EntryInPhase


class EntrySerializer(serializers.ModelSerializer):

    class Meta:
        model = Entry
        fields = '__all__'


class EntryInPhaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = EntryInPhase
        fields = '__all__'
