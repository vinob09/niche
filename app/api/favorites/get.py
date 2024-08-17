from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Favorite

favorite_get_routes = Blueprint("favorite_get", __name__)

@favorite_get_routes.route("")
@login_required
def get_favorites():
    '''
    Get all Favorites of current logged in user
    '''
    user_id = current_user.id
    favorites = Favorite.query.filter_by(user_id=user_id).all()
    favorite_data = [favorite.to_dict() for favorite in favorites]
    return jsonify(favorite_data)
