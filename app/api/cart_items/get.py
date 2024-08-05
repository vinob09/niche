from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload
from app.models import  CartItem, Product, db

from .__init__ import cart_item_routes

'''GET all cart items'''

@cart_item_routes.route("/<int:user_id>", methods=['GET'])
@login_required
def get_users_cart(user_id):
    items = CartItem.query.filter(CartItem.user_id==user_id).all()
                        #   .options(joinedload(CartItem.product)).all()
    user_items = [item.to_dict() for item in items]
    for item in user_items:
        product_det = Product.query.get(item['productId'])
        item['product_details'] = product_det.to_dict()
    return jsonify(user_items)
