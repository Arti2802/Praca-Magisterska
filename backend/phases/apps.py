from django.apps import AppConfig


class PhasesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'phases'

    def ready(self):
        import notifications.tasks
        from .signals import handle_semifinal, handle_final
