from .db import db, environment, SCHEMA
from .user import User
from .product import Product

class CartItem(db.Model):
    __tablename__ = 'cart_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id= db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('Product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    # many to one with User
    user = db.relationship("User", back_populates="items")
    # many to one with Product
    product = db.relationship("Product", back_populates="items")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'productId': self.product_id,
            'quantity': self.quantity
        }

## amzing work guys!
