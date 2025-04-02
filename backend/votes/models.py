from django.db import models
from users.models import User
from entries.models import EntryInPhase

# Create your models here.


class Vote(models.Model):
    points = models.PositiveIntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    entry = models.ForeignKey(EntryInPhase, on_delete=models.CASCADE)
