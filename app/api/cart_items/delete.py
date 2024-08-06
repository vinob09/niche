from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import  CartItem, db

cart_delete_items = Blueprint('cart_items_delete', __name__)

'''
Delete cart item by cart id
'''

@cart_delete_items.route("/<int:cart_item_id>", methods=['DELETE'])
@login_required
def add_to_cart(cart_item_id):
    check_cart = CartItem.query.filter_by(id=cart_item_id).first()

    if not check_cart:
        return {"errors": {"message": "Cart Item record not found"}}, 404

    db.session.delete(check_cart)
    db.session.commit()
    return {"message": "Successfully removed product from cart"}, 200
