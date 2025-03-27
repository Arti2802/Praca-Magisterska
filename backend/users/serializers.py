from rest_framework import serializers
from .models import User, UserInContest


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class UserInContestSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserInContest
        fields = '__all__'


class UserInContestPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserInContest
        fields = '__all__'
