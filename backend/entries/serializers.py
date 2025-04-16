from rest_framework import serializers
from .models import Entry, EntryInPhase, EntryInSemifinal, EntryInFinal
from countries.serializers import CountryPostSerializer


class EntrySerializer(serializers.ModelSerializer):

    class Meta:
        model = Entry
        fields = '__all__'


class EntryInSemifinalSerializer(serializers.ModelSerializer):

    class Meta:
        model = EntryInSemifinal
        fields = '__all__'


class EntryInFinalSerializer(serializers.ModelSerializer):

    class Meta:
        model = EntryInFinal
        fields = '__all__'


class EntryReprSerializer(serializers.ModelSerializer):
    country = CountryPostSerializer(read_only=True)
    entryinsemifinal = EntryInSemifinalSerializer(read_only=True)
    entryinfinal = EntryInFinalSerializer(read_only=True)

    class Meta:
        model = Entry
        fields = '__all__'


class EntryInPhaseSerializer(serializers.ModelSerializer):
    entry = EntryReprSerializer(read_only=True)

    class Meta:
        model = EntryInPhase
        fields = '__all__'
