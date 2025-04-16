from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Phase, Semifinal, Final
from notifications.scheduling import schedule_notification_for_phase


@receiver(post_save, sender=Semifinal)
def handle_semifinal(sender, instance, **kwargs):
    schedule_notification_for_phase(instance.id)


@receiver(post_save, sender=Final)
def handle_final(sender, instance, **kwargs):
    schedule_notification_for_phase(instance.id)
