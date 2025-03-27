from rest_framework import serializers
from .models import Entry, EntryInPhase


class EntryInPhaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = EntryInPhase
        fields = '__all__'


class EntrySerializer(serializers.ModelSerializer):
    entryinphase = EntryInPhaseSerializer(read_only=True)

    class Meta:
        model = Entry
        fields = '__all__'


# class EntryInPhaseSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = EntryInPhase
#         fields = '__all__'
