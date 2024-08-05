from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import Review, db
from app.forms.review_form import ReviewForm


review_put_routes = Blueprint("review_put", __name__)


@review_put_routes.route("/<int:review_id>", methods=["PUT"])
@login_required
def edit_review(review_id):
    '''
    Edit a Review by Id
    '''
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review = Review.query.get(review_id)

        if not review:
            return {"errors": {"message": "Invalid review id"}}, 404

        if review.user_id != current_user.id:
            return {"errors": {"message": "You must be the owner of this review to edit"}}, 403

        review.review = form.data["review"]
        review.star_rating = form.data["star_rating"]

        db.session.commit()
        return review.to_dict()

    return form.errors, 401
