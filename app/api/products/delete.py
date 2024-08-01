from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import Product, db

product_delete_routes = Blueprint("product_delete", __name__)

'''DELETE a Product by product_id'''
@product_delete_routes.route("/<int:product_id>", methods=['DELETE'])
@login_required
def delete_product(product_id):
    product = Product.query.get_or_404(product_id)

    if product.seller_id == current_user.id:
        db.session.delete(product)
        db.session.commit()

        return {'message': 'Product Deleted!'}


    return {'message': 'Unauthorized'}, 403
