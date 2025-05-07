from django.urls import path
from .views import NotificationsList, NotificationDetail, NotificationForUser, ReadNotifications, ScheduleList

urlpatterns = [
    path('notifications/', NotificationsList.as_view(), name=NotificationsList.name),
    path('notifications/<int:pk>/', NotificationDetail.as_view(), name=NotificationDetail.name),
    path('users/<int:pk>/notifications/', NotificationForUser.as_view(), name=NotificationForUser.name),
    path('users/<int:pk>/read-notifications/', ReadNotifications.as_view(), name=ReadNotifications.name),
    path('schedules/', ScheduleList.as_view(), name=ScheduleList.name),
]
