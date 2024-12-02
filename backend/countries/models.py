from django.db import models
from django_countries.fields import CountryField
from editions.models import Edition

# Create your models here.


class Country(models.Model):
    country = CountryField()


class CountryInEdition(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    edition = models.ForeignKey(Edition, on_delete=models.SET_NULL, null=True)
    borrowers = models.ManyToManyField(Country, related_name="borrower")
