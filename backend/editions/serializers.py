from rest_framework import serializers
from .models import Edition
from phases.serializers import FinalSerializer


class EditionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Edition
        fields = '__all__'


class EditionReprSerializer(serializers.ModelSerializer):
    final = FinalSerializer(read_only=True)

    class Meta:
        model = Edition
        fields = '__all__'
