from django.db import models
from contests.models import Contest
from users.models import User

# Create your models here.


class Edition(models.Model):
    contest = models.ForeignKey(to=Contest, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=True, blank=True)
    count = models.PositiveIntegerField()
    actual = models.BooleanField(default=True)
    postponed = models.BooleanField(default=False)
    special = models.BooleanField(default=False)
    claiming_start_date = models.DateTimeField(null=True)
    claiming_end_date = models.DateTimeField(null=True)
    sending_songs_start = models.DateTimeField(null=True)
    sending_songs_end = models.DateTimeField(null=True)

    def __str__(self):
        return "Edycja {} {}".format(self.count, self.contest)


class UserInEdition(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    edition = models.ForeignKey(Edition, on_delete=models.CASCADE)
