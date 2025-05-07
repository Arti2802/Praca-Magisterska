from rest_framework import serializers
from django_countries import countries
from .models import CountryInEdition
from django_countries.serializer_fields import CountryField


class CountrySerializer(serializers.ModelSerializer):
    code = serializers.CharField()
    name = serializers.CharField()

    @classmethod
    def get_countries(cls):
        return [{"code": code, "name": name} for code, name in countries]


class CountryPostSerializer(serializers.ModelSerializer):
    country = CountryField(country_dict=True)
    borrowers = serializers.ListSerializer(child=serializers.CharField())

    class Meta:
        model = CountryInEdition
        fields = '__all__'


class CountryInEditionSerializer(serializers.ModelSerializer):
    borrowers = serializers.ListSerializer(child=serializers.CharField())

    class Meta:
        model = CountryInEdition
        fields = '__all__'
