from django.contrib import admin
from .models import Profile, Transaction, Log

# Register your models here.

models_list = [Profile, Transaction, Log]
admin.site.register(models_list)