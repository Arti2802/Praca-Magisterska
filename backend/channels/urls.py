from django.urls import path
from .views import ChannelsInContest, ChannelDetail, MessagesList, MessagesInChannel, MessageDetail

urlpatterns = [
    path('contests/<int:pk>/channels/', ChannelsInContest.as_view(), name=ChannelsInContest.name),
    path('channels/<int:pk>/', ChannelDetail.as_view(), name=ChannelDetail.name),
    path('messages/', MessagesList.as_view(), name=MessagesList.name),
    path('messages/<int:pk>/', ChannelDetail.as_view(), name=MessageDetail.name),
    path('channels/<int:pk>/messages/', MessagesInChannel.as_view(), name=MessagesInChannel.name),
]
