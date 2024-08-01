from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import Product, ProductImage, Review, Favorite, Category, db

product_get_routes = Blueprint("product_get", __name__)
category_routes = Blueprint("categories", __name__)

'''GET all Products'''

@product_get_routes.route("/products", methods=['GET'])
def get_all_products():
    products = Product.query.all()
    products_data = [product.to_dict() for product in products]
    return jsonify(products_data)


'''GET a Product by product_id'''

@product_get_routes.route("/products/<int:product_id>", methods=['GET'])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    product_images = ProductImage.query.filter_by(product_id=product_id).all()
    reviews = Review.query.filter_by(product_id=product_id).all()

    product_data = product.to_dict()
    product_data['images'] = [image.to_dict() for image in product_images]
    product_data['reviews'] = [review.to_dict() for review in reviews]


    is_favorited = False
    if current_user.is_authenticated:
        favorite = Favorite.query.filter_by(user_id=current_user.id,product_id=product_id).first()
        if favorite:
            is_favorited = True
    
    product_data['is_favorited'] = is_favorited

    return jsonify(product_data)


'''GET all Products Owned by the Current User'''

@product_get_routes.route("/products/current", methods=['GET'])
@login_required
def get_curr_user_products():

    products = Product.query.filter_by(seller_id=current_user.id).all()
    products_data = [product.to_dict() for product in products]

    return jsonify(products_data)


'''    CATEGORIES   '''


'''GET all Products by Category'''

@product_get_routes.route("/products/categories/<int:category_id>", methods=['GET'])
def get_products_by_category(category_id):
    Category.query.get_or_404(category_id)
    products = Product.query.filter_by(category_id=category_id).all()
    products_data = [product.to_dict() for product in products]

    return jsonify(products_data)


'''GET all Categories'''

@category_routes.route("/categories", methods=['GET'])
def get_categories():
    categories = Category.query.all()
    categories_data = [category.to_dict() for category in categories]

    return jsonify(categories_data)