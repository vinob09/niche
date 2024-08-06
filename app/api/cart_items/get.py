from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload
from app.models import  CartItem, Product, db

cart_get_items = Blueprint('cart_items_get', __name__)

'''GET all cart items'''

@cart_get_items.route("/<int:user_id>", methods=['GET'])
@login_required
def get_users_cart(user_id):
    items = CartItem.query.filter(CartItem.user_id==user_id).all()
                        #   .options(joinedload(CartItem.product)).all()
    user_items = [item.to_dict() for item in items]
    for item in user_items:
        product_det = Product.query.get(item['productId'])
        item['product_details'] = product_det.to_dict()
    return jsonify(user_items)
