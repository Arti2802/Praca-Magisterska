from django.db import models

# Create your models here.
from editions.models import Edition
from phases.models import Phase, Semifinal, Final
from countries.models import CountryInEdition
#from users.models import User


class Entry(models.Model):
    artist = models.CharField(max_length=255, default=None)
    title = models.CharField(max_length=255)
    Youtube_URL = models.URLField()
    Spotify_URL = models.URLField()
    ts = models.TimeField()
    #user = models.ForeignKey(User, on_delete=models.CASCADE)
    country = models.ForeignKey(CountryInEdition, on_delete=models.SET_NULL, null=True)
    edition = models.ForeignKey(Edition, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.artist) + ' - ' + str(self.title)


class EntryInPhase(models.Model):
    running_order = models.PositiveIntegerField(null=True, blank=True)


class EntryInSemifinal(EntryInPhase):
    entry = models.OneToOneField(Entry, on_delete=models.CASCADE, null=True)
    semifinal = models.ForeignKey(Semifinal, on_delete=models.CASCADE, null=True)


class EntryInFinal(EntryInPhase):
    entry = models.OneToOneField(Entry, on_delete=models.CASCADE, null=True)
    final = models.ForeignKey(Final, on_delete=models.CASCADE, null=True)
