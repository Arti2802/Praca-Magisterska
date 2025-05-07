from django.db import models
from editions.models import Edition
from phases.models import Phase, Semifinal, Final
from countries.models import CountryInEdition
#from users.models import User
from django.utils.translation import gettext_lazy as _

# Create your models here.


class Entry(models.Model):
    class Status(models.IntegerChoices):
        REJECTED = 0, _('Odrzucone')
        ACCEPTED = 1, _('Zaakceptowane')

        __empty__ = _('Do rozpatrzenia')

    artist = models.CharField(max_length=255, default=None)
    title = models.CharField(max_length=255)
    Youtube_URL = models.URLField()
    Spotify_URL = models.URLField()
    ts = models.TimeField()
    additional_info = models.TextField(default='')
    country = models.ForeignKey(CountryInEdition, on_delete=models.SET_NULL, null=True)
    edition = models.ForeignKey(Edition, on_delete=models.CASCADE)
    status = models.IntegerField(choices=Status.choices, null=True)
    comment = models.TextField(default='')

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
