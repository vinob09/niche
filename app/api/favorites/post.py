from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Favorite, Product, db


favorite_post_routes = Blueprint("favorite_post", __name__)

@favorite_post_routes.route("/products/<int:product_id>", methods=["POST"])
@login_required
def add_favorite(product_id):
    '''
    Add a Product as a Favorite item by its Id
    '''
    product = Product.query.get(product_id)
    if not product:
        return {"errors": {"message": "Invalid product id"}}, 404

    favorite_exists = Favorite.query.filter_by(product_id=product_id, user_id=current_user.id).first()
    if favorite_exists:
        return {"errors": {"message": "Product is already in Favorites"}}, 400

    new_favorite = Favorite(
        user_id=current_user.id,
        product_id=product_id
    )
    db.session.add(new_favorite)
    db.session.commit()

    return {"message": "Successfully added product as a Favorite"}, 201
