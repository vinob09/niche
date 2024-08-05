from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Favorite, db

favorite_delete_routes = Blueprint("delete_route", __name__)

@favorite_delete_routes.route("/products/<int:product_id>", methods=["DELETE"])
@login_required
def delete_favorite(product_id):
    '''
    Delete a product as a Favorite by Id
    '''
    favorite = Favorite.query.filter_by(product_id=product_id, user_id=current_user.id).first()

    if not favorite:
        return {"errors": {"message": "Favorite record not found"}}, 404

    db.session.delete(favorite)
    db.session.commit()
    return {"message": "Successfully removed product as a Favorite"}
