from django.shortcuts import render
from .models import Channel, Message
from .serializers import ChannelSerializer, MessageSerializer, MessageReprSerializer
from rest_framework import generics

# Create your views here.


class ChannelsInContest(generics.ListCreateAPIView):
    name = 'channels-in-contest'
    serializer_class = ChannelSerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        return Channel.objects.filter(contest=pk)


class ChannelDetail(generics.RetrieveUpdateDestroyAPIView):
    name = 'channel-detail'
    serializer_class = ChannelSerializer
    queryset = Channel.objects.all()


class MessagesList(generics.ListCreateAPIView):
    name = 'messages-list'
    serializer_class = MessageSerializer
    queryset = Message.objects.all()


class MessageDetail(generics.RetrieveUpdateDestroyAPIView):
    name = 'message-detail'
    serializer_class = MessageSerializer
    queryset = Message.objects.all()


class MessagesInChannel(generics.ListAPIView):
    name = 'messages-in-contest'
    serializer_class = MessageReprSerializer
    ordering = ['-creation_date']

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        return Message.objects.filter(channel=pk)
