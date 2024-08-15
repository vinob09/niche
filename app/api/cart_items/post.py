from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload
from app.models import  CartItem, Product, db

cart_add_items = Blueprint('cart_items_post', __name__)

'''GET all cart items'''

@cart_add_items.route("/<int:product_id>", methods=['POST', 'PUT'])
@login_required
def add_to_cart(product_id):
    # check if item is in cart already
    check_cart = CartItem.query.filter(CartItem.user_id==current_user.id, CartItem.product_id==product_id).first()
    # get the body from the request
    r = request.get_json()
    # if item is already in cart / update quantity
    if check_cart:
        check_cart.quantity = r['quantity']
        data = check_cart.to_dict()
        db.session.commit()
        return jsonify(data)
    else:
        cart_item = CartItem(
        user_id = current_user.id,
        product_id = product_id,
        quantity = r['quantity']
        )

        db.session.add(cart_item)
        db.session.commit()
        data = cart_item.to_dict()
        return jsonify({
            data
        }), 200
