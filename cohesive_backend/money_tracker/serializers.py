from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Profile, Transaction, Log

# JSON To Model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        # extra_kwargs = {"password": {"write_only": True, "required": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["user", "budget", "expenditure", "friends"]
        
class LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Log
        fields = ["logId", "transactionId", "payee", "payers", "amount"]

class TransactionSerializer(serializers.ModelSerializer):
    logs = LogSerializer(many=True, read_only=True)
    class Meta:
        model = Transaction
        fields = ["transactionId", "createdBy", "category", "date", "totalAmount", "logs"]