from django.shortcuts import render
from rest_framework import generics
from .models import Country, CountryInEdition
from .serializers import CountrySerializer

# Create your views here.


class CountriesList(generics.ListCreateAPIView):
    name = "countries"
    serializer_class = CountrySerializer
    queryset = Country.objects.all()


class CountryDetail(generics.RetrieveUpdateDestroyAPIView):
    name = "country-detail"
    serializer_class = CountrySerializer
    queryset = Country.objects.all()


class EditionsCountries(generics.ListAPIView):
    name = "country-detail"
    serializer_class = CountrySerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        edition_countries = CountryInEdition.objects.filter(edition=pk)
        return Country.objects.filter(id__in=edition_countries)
