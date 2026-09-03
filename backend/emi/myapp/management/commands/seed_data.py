from django.core.management.base import BaseCommand 
from myapp.models import Products , Variant , EMIPlan 

class Command(BaseCommand) : 
    help = "Seed products, variants and EMI plans"

    def handle(self , *args ,**kwargs) :
        EMIPlan.objects.all().delete()
        Variant.objects.all().delete()
        Products.objects.all().delete()

        iphone = Products.objects.create(
            name = "iPhone 17 pro" , 
            slug = "iphone-17-pro",
            description = "Premium Apple SmartPhone with powerful performance" , 
            image = "https://res.cloudinary.com/djrza5kcv/image/upload/v1788407074/iphone_jmuccu.png"
        )
        Variant.objects.create(
            product = iphone , 
            storage = "128GB",
            color = "Orange", 
            mrp = 129999,
            price = 119999
        )

        Variant.objects.create(
            product = iphone ,
            storage = "521GB" , 
            color = "Black Titanium" , 
            mrp = 139999 ,
            price = 129999
        )

        Variant.objects.create(
            product = iphone ,
            storage = "521GB" ,
            color = "White Titanium" , 
            mrp = 159999,
            price = 149999
        )

        samsung = Products.objects.create(
            name = "Samsung Galaxy s24 Ultra" , 
            slug = "samsung-galarxy-s24-ultra",
            description = "Flagship Samsung smartphone with an advanced camera and powerful processor.",
            image = "https://res.cloudinary.com/djrza5kcv/image/upload/v1788407511/samsung_cjh3dw.png"
        )

        Variant.objects.create(
            product=samsung,
            storage="256GB",
            color="Titanium Gray",
            mrp=134999,
            price=119999
        )

        Variant.objects.create(
            product=samsung,
            storage="512GB",
            color="Titanium Black",
            mrp=144999,
            price=129999
        )

        Variant.objects.create(
            product=samsung,
            storage="1TB",
            color="Titanium Blue",
            mrp=164999,
            price=149999
        )

        pixel = Products.objects.create(
            name="Google Pixel 10 Pro",
            slug="google-pixel-10-pro",
            description="Google flagship smartphone with advanced AI-powered features.",
            image="https://res.cloudinary.com/djrza5kcv/image/upload/v1788407676/google_wunu5k.png"
        )

        Variant.objects.create(
            product=pixel,
            storage="128GB",
            color="Obsidian",
            mrp=109999,
            price=99999
        )

        Variant.objects.create(
            product=pixel,
            storage="256GB",
            color="Porcelain",
            mrp=119999,
            price=109999
        )

        Variant.objects.create(
            product=pixel,
            storage="512GB",
            color="Hazel",
            mrp=139999,
            price=124999
        )

        EMIPlan.objects.create(
            product=iphone,
            monthly_payment=9999,
            tenure=12,
            interest_rate=0,
            cashback=2000
        )

        EMIPlan.objects.create(
            product=iphone,
            monthly_payment=6249,
            tenure=18,
            interest_rate=10.5,
            cashback=1500
        )

        EMIPlan.objects.create(
            product=iphone,
            monthly_payment=4999,
            tenure=24,
            interest_rate=12.5,
            cashback=1000
        )

        EMIPlan.objects.create(
            product=samsung,
            monthly_payment=9999,
            tenure=12,
            interest_rate=0,
            cashback=2500
        )

        EMIPlan.objects.create(
            product=samsung,
            monthly_payment=6666,
            tenure=18,
            interest_rate=10.5,
            cashback=1500
        )

        EMIPlan.objects.create(
            product=samsung,
            monthly_payment=5416,
            tenure=24,
            interest_rate=12.5,
            cashback=1000
        )
        EMIPlan.objects.create(
            product=pixel,
            monthly_payment=8333,
            tenure=12,
            interest_rate=0,
            cashback=2000
        )

        EMIPlan.objects.create(
            product=pixel,
            monthly_payment=5833,
            tenure=18,
            interest_rate=10.5,
            cashback=1500
        )

        EMIPlan.objects.create(
            product=pixel,
            monthly_payment=4583,
            tenure=24,
            interest_rate=12.5,
            cashback=1000
        )

        self.stdout.write(
            self.style.SUCCESS(
                "\nSeed data created successfully!\n"
                "Products: 3\n"
                "Variants: 9\n"
                "EMI Plans: 9\n"
            )
        )