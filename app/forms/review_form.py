from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired, NumberRange


class ReviewForm(FlaskForm):
    review = TextAreaField("Comment", validators=[DataRequired()])
    star_rating = IntegerField("Rating",
                               validators=[NumberRange
                                           (min=1,
                                            max=5,
                                            message="Rating must be a number between 1 to 5"
                                            )])
