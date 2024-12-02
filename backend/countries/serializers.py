from .models import Country, CountryInEdition
from rest_framework import serializers
from django_countries.serializer_fields import CountryField


class CountrySerializer(serializers.ModelSerializer):
    country = CountryField()

    class Meta:
        model = Country
        fields = ('__all__')
