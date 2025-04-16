from django_q.tasks import schedule
from django_q.models import Schedule
from datetime import timedelta
from django.utils.timezone import now
from phases.models import Phase, Semifinal

import logging
logger = logging.getLogger(__name__)


def schedule_notification_for_phase(phase_id):
    phase = Phase.objects.get(id=phase_id)
    if Semifinal.objects.filter(id=phase_id).exists():
        phase = phase.semifinal
    else:
        phase = phase.final

    voting_start = phase.voting_start_date
    voting_end_day_before = phase.voting_end_date - timedelta(days=1)
    results_one_hour_before = phase.results_date - timedelta(hours=1)
    results = phase.results_date

    task_name = f'Notify voting start {phase_id}'
    Schedule.objects.filter(name=task_name).delete()

    schedule(
        'notifications.tasks.send_voting_start_notification',
        phase_id,
        name=f'Notify voting start {phase_id}',
        schedule_type='O',
        next_run=voting_start,
    )

    schedule(
        'notifications.tasks.send_voting_end_notification',
        phase_id,
        1,
        name=f'Notify voting end day before {phase_id}',
        schedule_type='O',
        next_run=voting_end_day_before,
    )

    schedule(
        'notifications.tasks.send_phase_notification',
        phase_id,
        1,
        name=f'Notify results one hour before {phase_id}',
        schedule_type='O',
        next_run=results_one_hour_before,
    )

    schedule(
        'notifications.send_results_notification',
        phase_id,
        name=f'Notify results {phase_id}',
        schedule_type='O',
        next_run=results,
    )
