from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload
from app.models import  CartItem, Product, db

cart_add_items = Blueprint('cart_items_post', __name__)

'''GET all cart items'''

@cart_add_items.route("/<int:product_id>", methods=['POST'])
@login_required
def add_to_cart(product_id):
    cart_item = CartItem(
        user_id = current_user.id,
        product_id = product_id,
        quantity=1
    )

    db.session.add(cart_item)
    db.session.commit()

    return jsonify({
        'cart_Id': cart_item.id
    }), 201
