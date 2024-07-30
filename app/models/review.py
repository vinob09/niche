from .db import db, environment, SCHEMA
from user import User
from product import Product

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.String, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('Product.id'), nullable=False)
    review = db.Column(db.String(1000), nullable=False)
    star_rating = db.Column(db.Integer, nullable=False)