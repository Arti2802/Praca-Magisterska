from django.db import models
from django_countries.fields import CountryField
from editions.models import Edition
from users.models import User

# Create your models here.


class Country(models.Model):
    country = CountryField()


class CountryInEdition(models.Model):
    #country = models.ForeignKey(Country, on_delete=models.CASCADE)
    country = CountryField()
    edition = models.ForeignKey(Edition, on_delete=models.SET_NULL, null=True)
    #borrowers = models.ManyToManyField(Country, related_name="borrower")
    borrowers = CountryField(multiple=True, default=[], blank=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return "{} {}".format(self.country.name, self.edition)
