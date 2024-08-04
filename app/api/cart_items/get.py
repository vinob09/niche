from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import  db

from .__init__ import cart_item_routes

'''GET all cart items'''

@cart_item_routes.route("", methods=['GET'])
def get_all_products():
    products = Product.query.all()
    products_data = [product.to_dict() for product in products]
    return jsonify(products_data)
