from django.db import models
from users.models import User
from entries.models import Entry

# Create your models here.


class Vote(models.Model):
    points = models.PositiveIntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    entry = models.ForeignKey(Entry, on_delete=models.CASCADE)
