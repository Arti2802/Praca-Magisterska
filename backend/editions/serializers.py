from rest_framework import serializers
from .models import Edition


class EditionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Edition
        fields = '__all__'
