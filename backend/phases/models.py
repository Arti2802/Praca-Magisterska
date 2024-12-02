from django.db import models
from editions.models import Edition

# Create your models here.


class Phase(models.Model):
    edition = models.ForeignKey(Edition, on_delete=models.CASCADE)
    voting_start_date = models.DateTimeField()
    voting_end_date = models.DateTimeField()
    results_date = models.DateTimeField()


class Semifinal(Phase):
    count = models.PositiveIntegerField()
    number_of_countries_qualify = models.PositiveIntegerField()


class Final(Phase):
    pass
