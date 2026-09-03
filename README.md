# 1Fi EMI Shopping Platform

A full-stack EMI-based product shopping application built as part of the 1Fi SDE1 assignment.

The application allows users to browse smartphones, view product variants, compare EMI plans, select a preferred variant and EMI plan, and proceed with their selected plan.

The application uses a React frontend, Django REST Framework backend, and PostgreSQL database.

---

## 📌 Project Overview

The goal of this project is to build a simple full-stack web application where users can purchase products through flexible EMI plans.

The application provides:

- Product listing
- Product details
- Product variants
- MRP and selling price
- EMI plans
- Monthly EMI amount
- EMI tenure
- Interest rate
- Cashback information
- Variant selection
- EMI plan selection
- Confirmation before proceeding
- Search functionality
- Responsive UI

All product and EMI information is stored in PostgreSQL and served to the React frontend through Django REST APIs.

No product or EMI information is hardcoded in the frontend.

---

# ✨ Features

## Product Listing

Users can view all available products on the home page.

Each product displays:

- Product name
- Product image
- Product description
- Starting price
- MRP
- Discount
- Number of variants
- Number of EMI plans
- Starting EMI amount

---

## 🔎 Product Search

Users can search for products using the search box.

The product list updates dynamically based on the entered search text.

---

## 📱 Product Details

Each product has a unique URL based on its slug.

Example:

```text
/products/iphone-17-pro
/products/samsung-galaxy-s24-ultra
/products/oneplus-13
