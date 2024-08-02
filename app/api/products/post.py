from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import Product, db
# from app.forms import ProductDetailForm #TO BE CREATED

product_post_routes = Blueprint("product_post", __name__)

'''POST a New Product'''
# @product_post_routes.route("", methods=["POST"])
# @login_required
# def create_product():
#     # form = ProductDetailForm() #to be created
#     #cookies
#     if form.validate_on_submit():
#         new_product = Product(
#          seller_id = current_user.id,
#          category_id = form.data['category_id'],
#          name = form.data['name'],
#          description = form.data['description'],
#          price = form.data['price']
#         )
#         db.session.add(new_product)
#         db.session.commit()

#         return jsonify({"product_id": new_product.id}), 201
#     return jsonify(form.errors), 400
