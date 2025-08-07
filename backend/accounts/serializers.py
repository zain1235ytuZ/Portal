from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={'input_type': 'password'}, min_length=8)
    class Meta:
        model = User
        fields = ('username', 'email','password')
       


    def create(self, validated_data):
        user = User.objects.create_user(
           validated_data['username'],
           validated_data['email'],
              validated_data['password']
        )
        return user

