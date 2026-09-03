from rest_framework import serializers
from .models import Products, Variant, EMIPlan


class VariantSerializer(serializers.ModelSerializer):

    class Meta:
        model = Variant
        fields = [
            'id',
            'storage',
            'color',
            'mrp',
            'price',
        ]


class EMIPlanSerializer(serializers.ModelSerializer):

    class Meta:
        model = EMIPlan
        fields = [
            'id',
            'monthly_payment',
            'tenure',
            'interest_rate',
            'cashback',
        ]


class ProductSerializer(serializers.ModelSerializer):

    variants = VariantSerializer(
        many=True,
        read_only=True
    )

    emi_plans = EMIPlanSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Products
        fields = [
            'id',
            'name',
            'slug',
            'description',
            'image',
            'created_at',
            'variants',
            'emi_plans',
        ]