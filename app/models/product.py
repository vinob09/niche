from .db import db, environment, SCHEMA
from .user import User
from .category import Category
from .favorite import Favorite
from .cartItem import CartItem
from .orderItem import OrderItem
from .review import Review
from .productImage import ProductImage


class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    seller_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('Category.id'), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    price = db.Column(db.Float, nullable=False)


    # many to one with User
    user = db.relationship("User", back_populates="products")
    # one to many with Favorite
    favorites = db.relationship("Favorite", back_populates="product")
    # one to many with CartItem
    items = db.relationship("CartItem", back_populates="product")
    # one to many with OrderItem
    order_items = db.relationship("OrderItem", back_populates="product")
    # one to many with Review
    reviews = db.relationship("Review", back_populates="product")
    # one to many with ProductImage
    images = db.relationship("ProductImage", back_populates="product")
    # many to one with User
    category = db.relationship("Category", back_populates="products")


    def to_dict(self):
        return {
            'id': self.id,
            'sellerId': self.seller_id,
            'categoryId': self.category_id,
            'name': self.name,
            'description': self.description,
            'price': self.price
        }