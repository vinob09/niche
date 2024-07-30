from .db import db, environment, SCHEMA
from .user import User
from .category import Category

class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    seller_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('Category.id'), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    price = db.Column(db.Float, nullable=False)
