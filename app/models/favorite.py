from .db import db, environment, SCHEMA
from product import Product
from user import User

class Favorite(db.Model):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('Product.id'), nullable=False)
    