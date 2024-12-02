from rest_framework import serializers
from .models import Phase, Semifinal, Final


class PhaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Phase
        fields = '__all__'


class SemifinalSerializer(serializers.ModelSerializer):

    class Meta:
        model = Semifinal
        fields = '__all__'


class FinalSerializer(serializers.ModelSerializer):

    class Meta:
        model = Final
        fields = '__all__'
