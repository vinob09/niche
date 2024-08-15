from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import Product, Review, PastOrder, ProductImage, Category, OrderItem, db
from app.forms import ImageForm
from app.forms.product_form import ProductForm
from app.forms.review_form import ReviewForm


product_post_routes = Blueprint("product_post", __name__)

'''POST a New Product'''
@product_post_routes.route("", methods=["POST"])
@login_required
def create_product():
    form = ProductForm()
    form.category_id.options = [(category.id) for category in Category.query.all()]
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_product = Product(
            seller_id = current_user.id,
            name = form.data['name'],
            description = form.data['description'],
            price = form.data['price'],
            category_id = form.data['category_id']
        )
        db.session.add(new_product)
        db.session.commit()

        return jsonify(new_product.to_dict()), 201
    return jsonify(form.errors), 400


'''POST a New Review for a Product by Product's id'''
@product_post_routes.route('/<int:product_id>/reviews', methods=['POST'])
@login_required
def new_product_review(product_id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = form.review.data
        star_rating = form.star_rating.data

        past_order = (
            db.session.query(OrderItem)
            .join(PastOrder)
            .filter(PastOrder.purchaser_id == current_user.id)
            .filter(OrderItem.product_id == product_id)
            .first()
        )

        if not past_order:
            return jsonify({'error': 'User must have this product in a past order.'}), 403

        new_review = Review(
            user_id = current_user.id,
            product_id = product_id,
            review = review,
            star_rating = star_rating
        )
        db.session.add(new_review)
        db.session.commit()

        return jsonify({'review_id': new_review.id}), 201
    return jsonify(form.errors), 400


'''POST an Image to a Product based on Id'''
@product_post_routes.route("/<int:product_id>/images", methods=["POST"])
@login_required
def add_image(product_id):
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        product = Product.query.get(product_id)

        if not product:
            return {"errors": {"message": "Invalid product id"}}, 404

        if product.seller_id != current_user.id:
            return {"errors": {"message": "You must own this product to add an image"}}, 403

        new_image = ProductImage(
            product_id=product_id,
            url=form.data['url']
        )

        db.session.add(new_image)
        db.session.commit()
        return new_image.to_dict()

    return form.errors, 401
