from django.urls import path
from .views import CountriesList, CountryDetail, EditionsCountries

urlpatterns = [
    path('countries/', CountriesList.as_view(), name=CountriesList.name),
    path('countries/<int:pk>/', CountryDetail.as_view(), name=CountryDetail.name),
    path('editions/<int:pk>/contests/', EditionsCountries.as_view(), name=EditionsCountries.name),
]