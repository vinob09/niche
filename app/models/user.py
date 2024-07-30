from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .product import Product
from .cartItem import CartItem
from .favorite import Favorite
from .review import Review
from .pastOrder import PastOrder


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    first_name= db.Column(db.String(30), nullable=False)
    last_name= db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    # one to many with Product
    products = db.relationship("Product", back_populates="user")
    # one to many with CartItem
    items = db.relationship("CartItem", back_populates="user")
    # one to many with Favorite
    favorites = db.relationship("Favorite", back_populates="user")
    # one to many with Review
    reviews = db.relationship("Review", back_populates="user")
    # one to many with PastOrder
    orders = db.relationship("PastOrder", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'email': self.email
        }
