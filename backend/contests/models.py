from django.db import models

# Create your models here.


class Contest(models.Model):
    name = models.CharField(max_length=255)
    logo = models.ImageField(blank=True)

    def __str__(self):
        return "{}".format(self.name)
