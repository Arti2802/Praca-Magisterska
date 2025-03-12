from django.db import models

# Create your models here.
from editions.models import Edition
from users.models import User
from phases.models import Phase


class Entry(models.Model):
    artist = models.CharField(max_length=255, default=None)
    title = models.CharField(max_length=255)
    Youtube_URL = models.URLField()
    Spotify_URL = models.URLField()
    ts = models.TimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    edition = models.ForeignKey(Edition, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.artist) + ' - ' + str(self.title)


class EntryInPhase(models.Model):
    entry = models.OneToOneField(Entry, on_delete=models.CASCADE)
    phase = models.ForeignKey(Phase, on_delete=models.CASCADE)
    running_order = models.PositiveIntegerField()

