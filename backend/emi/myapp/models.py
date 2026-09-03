from django.db import models
from django.contrib.auth.models import User 

class Products(models.Model):
    name = models.CharField(max_length = 200)
    slug = models.SlugField(unique = True)
    description = models.TextField(blank = True)
    image = models.URLField()
    created_at = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.name 

class Variant(models.Model):
    product = models.ForeignKey(Products ,on_delete = models.CASCADE , related_name = 'variants')
    storage = models.CharField(max_length = 50)
    color = models.CharField(max_length = 50)
    mrp = models.DecimalField(max_digits =10 , decimal_places = 2)
    price = models.DecimalField(max_digits=10 , decimal_places = 2)

    def __str__(self):
        return f"{self.product.name} - {self.storage} - {self.color}"

class EMIPlan(models.Model):
    product = models.ForeignKey(Products , on_delete = models.CASCADE , related_name = "emi_plans")
    monthly_payment = models.DecimalField(max_digits = 10 , decimal_places = 2)
    tenure = models.PositiveIntegerField()
    interest_rate = models.DecimalField(max_digits = 5, decimal_places = 2)
    cashback = models.DecimalField(max_digits = 10, decimal_places = 2, default =0)
    def __str__(self):
        return f"{self.product.name} - {self.tenure} months"


