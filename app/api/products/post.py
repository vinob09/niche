from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import Product, Review, PastOrder, db
# from app.forms import ProductDetailForm #TO BE CREATED
#from app.forms import ProductReviewForm #TO BE CREATED

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
'''POST a New Review for a Product by Product's id'''
# @product_post_routes.route('/<int:product_id>/reviews', methods=['POST'])
# @login_required
# def new_product_review(product_id):
#     form = ProductReviewForm()

#     if form.validate_on_submit():
#         review = form.review.data
#         star_rating = form.star_rating.data


#         past_order = PastOrder.query.filter_by(purchaser_id=current_user.id, product_id=product_id).first()

#         if not past_order:
#             return jsonify({'error': 'User must have this product in a past order.'}), 403
    
#         new_review = Review(
#          user_id = current_user.id,
#           product_id = product_id,
#           review = review,
#          star_rating = star_rating
#         )
#         db.session.add(new_review)
#         db.session.commit()

#         return jsonify({'review_id': new_review.id}), 201
#     return jsonify(form.errors), 400