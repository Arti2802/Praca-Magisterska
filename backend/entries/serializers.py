from rest_framework import serializers
from .models import Entry, EntryInPhase, EntryInSemifinal, EntryInFinal


class EntryInSemifinalSerializer(serializers.ModelSerializer):

    class Meta:
        model = EntryInSemifinal
        fields = '__all__'


class EntryInFinalSerializer(serializers.ModelSerializer):

    class Meta:
        model = EntryInFinal
        fields = '__all__'


class EntrySerializer(serializers.ModelSerializer):
    entryinsemifinal = EntryInSemifinalSerializer(read_only=True)
    entryinfinal = EntryInFinalSerializer(read_only=True)

    class Meta:
        model = Entry
        fields = '__all__'


class EntryInPhaseSerializer(serializers.ModelSerializer):
    entry = EntrySerializer(read_only=True)

    class Meta:
        model = EntryInPhase
        fields = '__all__'
