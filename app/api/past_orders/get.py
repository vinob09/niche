from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import PastOrder, OrderItem, Product

past_order_get_routes = Blueprint("past_order_get", __name__)

'''
    Get all passed orders of current logged in user
'''

@past_order_get_routes.route("/")
@login_required
def get_past_orders():
    orders = PastOrder.query.filter_by(purchaser_id=current_user.id).all()
    order_data = [order.to_dict() for order in orders]

    if not orders:
        return {"errors": {"message": "User has no past orders"}}

    return jsonify(order_data)

@past_order_get_routes.route("/<int:order_id>")
@login_required
def get_past_orders(order_id):
    order_items = OrderItem.query.filter_by(order_id=order_id).all()
    items_data = [item.to_dict() for item in order_items]

    for item in items_data:
        product = Product.query.filter_by(id=item.product_id).first()
        item['Product_details'] = product.to_dic()

    if not order_items:
        return {"errors": {"message": "Past Order does not exist"}}

    return jsonify(items_data)
