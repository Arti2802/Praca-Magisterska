from django.db import models
from django.contrib.auth.models import AbstractUser
from contests.models import Contest

# Create your models here.


class User(AbstractUser):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255)
    password = models.CharField(max_length=255)


class UserInContest(models.Model):
    class Roles(models.TextChoices):
        OWNER = 'owner'
        ADMIN = 'admin'
        MODERATOR = 'moderator'
        MEMBER = 'member'

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    contest = models.ForeignKey(Contest, on_delete=models.CASCADE)
    role = models.CharField(max_length=255, choices=Roles.choices, default=Roles.MEMBER)
    joining_date = models.DateTimeField(auto_now_add=True)
    banned = models.BooleanField(default=False)
