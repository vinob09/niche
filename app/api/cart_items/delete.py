from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import  CartItem, db

cart_delete_items = Blueprint('cart_items_delete', __name__)

'''
Delete cart item by cart id
'''

@cart_delete_items.route("/<int:cart_item_id>", methods=['DELETE'])
@login_required
def remove_from_cart(cart_item_id):
    item = CartItem.query.get_or_404(cart_item_id)

    db.session.delete(item)
    db.session.commit()
    return { 'id': cart_item_id}
