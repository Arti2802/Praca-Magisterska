from django.db import models
from contests.models import Contest
from users.models import User

# Create your models here.


class Edition(models.Model):
    contest = models.ForeignKey(to=Contest, on_delete=models.CASCADE)
    count = models.PositiveIntegerField()


class UserInEdition(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    edition = models.ForeignKey(Edition, on_delete=models.CASCADE)
