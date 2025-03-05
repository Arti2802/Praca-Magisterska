from rest_framework import serializers
from django_countries import countries
#from .models import Country, CountryInEdition
#from django_countries.serializer_fields import CountryField


class CountrySerializer(serializers.Serializer):
    code = serializers.CharField()
    name = serializers.CharField()

    @classmethod
    def get_countries(cls):
        return [{"code": code, "name": name} for code, name in countries]


# class CountrySerializer(serializers.ModelSerializer):
#     country = CountryField()
#
#     class Meta:
#         model = Country
#         fields = ('__all__')
