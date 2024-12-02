from django.db import models
from users.models import User

# Create your models here.


class Contest(models.Model):
    name = models.CharField(max_length=255)
    logo = models.ImageField()


class UserInContest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    contest = models.ForeignKey(Contest, on_delete=models.CASCADE)
    role = models.CharField(max_length=255,
                            choices=[('OWNER', 'owner'),
                                     ('ADMIN', 'admin'),
                                     ('MODERATOR', 'moderator'),
                                     ('MEMBER', 'member')
                                     ], default='owner')
