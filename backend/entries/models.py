from django.db import models

# Create your models here.
from editions.models import Edition
from users.models import User


class Entry(models.Model):
    artist = models.CharField(max_length=255, default=None)
    title = models.CharField(max_length=255)
    Youtube_URL = models.URLField()
    Spotify_URL = models.URLField()
    ts = models.TimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    edition = models.ForeignKey(Edition, on_delete=models.CASCADE)
