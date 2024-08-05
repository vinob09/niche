from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Review

review_get_routes = Blueprint("review_get", __name__)

@review_get_routes.route("/")
def get_all_reviews():
    '''
    Get all Reviews
    '''
    reviews = Review.query.all()
    review_data = [review.to_dict() for review in reviews]
    return jsonify(review_data)
