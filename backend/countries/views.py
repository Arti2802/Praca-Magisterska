from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Country, CountryInEdition
from .serializers import CountrySerializer, CountryPostSerializer, CountryInEditionSerializer
from rest_framework import status

# Create your views here.


class CountriesList(APIView):
    name = "countries"

    def get(self, request):
        countries_data = CountrySerializer.get_countries()
        return Response(countries_data)


# class CountriesList(generics.ListCreateAPIView):
#     name = "countries"
#     serializer_class = CountrySerializer
#     queryset = countries.objects.all()


class CountryDetail(generics.RetrieveUpdateDestroyAPIView):
    name = "country-detail"
    serializer_class = CountryInEditionSerializer
    queryset = CountryInEdition.objects.all()


class EditionsCountries(generics.ListCreateAPIView):
    name = "countries-in-edition"
    serializer_class = CountryPostSerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        return CountryInEdition.objects.filter(edition=pk)


class CountriesInEdition(APIView):
    name = 'countries-in-edition-manage'

    def post(self, request, **kwargs):
        countries = request.data
        pk = kwargs.get('pk')
        countries_in_edition = []
        for country in countries:
            countries_in_edition.append({
                'country': country['country'],
                'borrowers': country['borrowers'],
                'edition': pk
            })
        serializer = CountryInEditionSerializer(data=countries_in_edition, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ClaimCountry(APIView):
    name = 'claim-country'

    def put(self, request, **kwargs):
        countries = request.data
        pk = kwargs.get('pk')
        for country in countries:
            country_code = country['country']['code']
            edition = country['edition']
            if not CountryInEdition.objects.filter(country=country_code, user__isnull=False).exists():
                CountryInEdition.objects.filter(country=country_code, edition=edition).update(user=pk)
                country_name = country['country']['name']

                return Response({'message': f'Otrzymano państwo {country_name}'}, status=status.HTTP_200_OK)
        return Response({'message': 'Nie udało się otrzymać państwa'}, status=status.HTTP_400_BAD_REQUEST)
