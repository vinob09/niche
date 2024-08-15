from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, FloatField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange


class ProductForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), Length(max=50)])
    description = TextAreaField("Description", validators=[DataRequired(), Length(max=1000)])
    price = FloatField("Price", validators=[DataRequired(), NumberRange(min=0)])
    category_id = IntegerField("Category", validators=[DataRequired()])
