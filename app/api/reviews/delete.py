from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import Review, db

review_delete_routes = Blueprint("review_delete", __name__)


@review_delete_routes.route("/<int:review_id>", methods=["DELETE"])
@login_required
def delete_review(review_id):
    '''
    Delete a Review by Id
    '''
    review = Review.query.get(review_id)

    if not review:
        return {"errors": {"message": "Invalid review id"}}, 404

    if review.user_id != current_user.id:
        return {"errors": {"message": "You must own the review to remove it from the system"}}, 403

    db.session.delete(review)
    db.session.commit()
    return {"message": "Successfully deleted review"}
