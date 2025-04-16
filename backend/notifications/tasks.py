from .models import Notification
from users.models import User
from phases.models import Phase, Semifinal, Final


def send_voting_start_notification(phase_id):
    phase = Phase.objects.get(id=phase_id)
    if Semifinal.objects.filter(id=phase_id).exists():
        phase = phase.semifinal
        message = f"Rozpoczęło się głosowanie w {phase.count} półfinale!"
    else:
        phase = phase.final
        message = f"Rozpoczęło się głosowanie w finale!"
    contest = phase.edition.contest
    users = User.objects.filter(userincontest__contest=contest)

    for user in users:
        Notification.objects.create(
            user=user,
            contest=contest,
            message=message
        )


def send_voting_end_notification(phase_id, days_before=0):
    phase = Phase.objects.get(id=phase_id)
    if Semifinal.objects.filter(id=phase_id).exists():
        phase = phase.semifinal
        message = f"Głosowanie w {phase.count} półfinale kończy się za {days_before} dni!"
    else:
        phase = phase.final
        message = f"Głosowanie w finale kończy się za {days_before} dni!"
    contest = phase.edition.contest
    users = User.objects.filter(userincontest__contest=contest)

    for user in users:
        Notification.objects.create(
            user=user,
            contest=contest,
            message=message
        )


def send_results_notification(phase_id, hours_before=0):
    phase = Phase.objects.get(id=phase_id)
    if Semifinal.objects.filter(id=phase_id).exists():
        phase = phase.semifinal
        message = f"Za {hours_before} godzin wyniki {phase.count} półfinału!"
    else:
        phase = phase.final
        message = f"Za {hours_before} godzin wyniki finału!"
    contest = phase.edition.contest
    users = User.objects.filter(userincontest__contest=contest)

    for user in users:
        Notification.objects.create(
            user=user,
            contest=contest,
            message=message
        )
