from .db import db, environment, SCHEMA, add_prefix_for_prod


class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    seller_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='SET NULL'), nullable=True)
    category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id'), ondelete='SET NULL'), nullable=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    price = db.Column(db.Float, nullable=False)

    # many to one with User
    seller = db.relationship("User", back_populates="products", passive_deletes=True)
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
    category = db.relationship("Category", back_populates="products", passive_deletes=True)


    def to_dict(self):
        return {
            'id': self.id,
            'sellerId': self.seller_id,
            'categoryId': self.category_id,
            'name': self.name,
            'description': self.description,
            'price': self.price
        }
