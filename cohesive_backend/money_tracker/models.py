from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    budget = models.FloatField(null=True, blank=True)
    expenditure = models.FloatField(null=True, blank=True)
    friends = models.ManyToManyField(User, blank=True, related_name="friend")

    def __str__(self):
        return str(self.user)

class Transaction(models.Model):
    transactionId = models.AutoField(primary_key=True)
    createdBy = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name='creator')
    category = models.CharField(max_length=100)
    date = models.DateField(auto_now_add=True)
    totalAmount = models.FloatField()

    def __str__(self):
        return str(self.transactionId)

class Log(models.Model):
    logId = models.AutoField(primary_key=True)
    transactionId = models.ForeignKey(Transaction, null=True, on_delete=models.CASCADE, related_name='logs')
    payee = models.CharField(max_length=100)
    payers = models.CharField(max_length=100)
    amount = models.FloatField()

    def __str__(self):
        return str(self.logId)