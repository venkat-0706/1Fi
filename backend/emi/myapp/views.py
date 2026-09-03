from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from .models import Products
from .serializers import ProductSerializer


class ProductListView(APIView):

    def get(self, request):
        products = Products.objects.all()
        serializer = ProductSerializer(products, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class ProductDetailView(APIView):

    def get(self, request, slug):
        try:
            product = Products.objects.get(slug=slug)
        except Products.DoesNotExist:
            return Response(
                {"error": "Product not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ProductSerializer(product)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )