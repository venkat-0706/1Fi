from django.contrib import admin
from .models import Products, Variant, EMIPlan

admin.site.register(Products)
admin.site.register(Variant)
admin.site.register(EMIPlan)