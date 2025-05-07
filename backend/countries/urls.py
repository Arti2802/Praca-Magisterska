from django.urls import path
from .views import CountriesList, CountryDetail, EditionsCountries, CountriesInEdition, ClaimCountry

urlpatterns = [
    path('countries/', CountriesList.as_view(), name=CountriesList.name),
    path('countries/<int:pk>/', CountryDetail.as_view(), name=CountryDetail.name),
    path('editions/<int:pk>/countries/', EditionsCountries.as_view(), name=EditionsCountries.name),
    path('editions/<int:pk>/countries-manage/', CountriesInEdition.as_view(), name=CountriesInEdition.name),
    path('claim-country/<int:pk>/', ClaimCountry.as_view(), name=ClaimCountry.name),
]