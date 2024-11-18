from django.db import models
from contests.models import Contest

# Create your models here.


class Edition(models.Model):
    contest = models.ForeignKey(to=Contest, on_delete=models.CASCADE)
    count = models.PositiveIntegerField()
