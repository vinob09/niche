from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload
from app.models import  CartItem, Product, db

cart_add_items = Blueprint('cart_items_post', __name__)

'''GET all cart items'''

@cart_add_items.route("/<int:product_id>", methods=['POST', 'PUT'])
@login_required
def add_to_cart(product_id):
    check_cart = CartItem.query.filter(CartItem.user_id==current_user.id, CartItem.product_id==product_id).all()
    r = request.get_json()
    if check_cart:
        check_cart[0].quantity = r['quantity']
        db.session.commit()
        return jsonify(check_cart[0].to_dict())
    else:
        cart_item = CartItem(
        user_id = current_user.id,
        product_id = product_id,
        quantity = r['quantity']
        )

        db.session.add(cart_item)
        db.session.commit()

        return jsonify({
            'cart_Id': cart_item.id
        }), 200
