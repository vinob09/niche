from .db import db, environment, SCHEMA
from .user import User
from .product import Product

class CartItem(db.Model):
    __tablename__ = 'cart_items'

    id= db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('Product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
