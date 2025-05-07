from django.db import models
from contests.models import Contest
from users.models import User

# Create your models here.


class Channel(models.Model):
    name = models.CharField(max_length=100)
    contest = models.ForeignKey(Contest, on_delete=models.CASCADE)

    def __str__(self):
        return 'Kanał {} w {}'.format(self.name, self.contest)


class Message(models.Model):
    content = models.TextField()
    creation_date = models.DateTimeField(auto_now_add=True)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return '{}...'.format(self.content)
