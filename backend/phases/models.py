from django.db import models
from editions.models import Edition

# Create your models here.


class Phase(models.Model):
    voting_start_date = models.DateTimeField(null=True, blank=True)
    voting_end_date = models.DateTimeField(null=True, blank=True)
    results_date = models.DateTimeField(null=True, blank=True)


class Semifinal(Phase):
    edition = models.ForeignKey(Edition, on_delete=models.CASCADE, null=True)
    count = models.PositiveIntegerField()
    number_of_countries_qualify = models.PositiveIntegerField()

    def __str__(self):
        return str(self.count) + " półfinał " + str(self.edition)


class Final(Phase):
    edition = models.OneToOneField(Edition, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return "Finał " + str(self.edition)
