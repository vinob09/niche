from .db import db, environment, SCHEMA
from .user import User
from .product import Product

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.String, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('Product.id'), nullable=False)
    review = db.Column(db.String(1000), nullable=False)
    star_rating = db.Column(db.Integer, nullable=False)

    # many to one with User
    user = db.relationship("User", back_populates="reviews")
    # many to one with Product
    product = db.relationship("Product", back_populates="reviews")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'productId': self.product_id,
            'review': self.review,
            'starRating': self.star_rating
        }