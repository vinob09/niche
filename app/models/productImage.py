from .db import db, environment, SCHEMA
from product import Product

class ProductImage(db.Model):
    __tablename__ = 'product_images'

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('Product.id'), nullable=False)
    url = db.Column(db.String, nullable=False)

    