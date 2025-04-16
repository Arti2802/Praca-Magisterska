from django.db import models
from users.models import User
from contests.models import Contest

# Create your models here.


class Notification(models.Model):
    message = models.TextField()
    read = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    contest = models.ForeignKey(Contest, on_delete=models.SET_NULL, null=True)
    creation_date = models.DateTimeField(auto_now_add=True)
