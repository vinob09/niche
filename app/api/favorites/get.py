from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Favorite

favorite_get_routes = Blueprint("favorite_get", __name__)

@favorite_get_routes.route("/")
@login_required
def get_favorites():
    '''
    Get all Favorites of current logged in user
    '''
    favorites = Favorite.query.all()
    favorite_data = [favorite.to_dict() for favorite in favorites]
    return jsonify(favorite_data)
