from .db import db, environment, SCHEMA, add_prefix_for_prod


class CartItem(db.Model):
    __tablename__ = 'cart_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id= db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='SET NULL'), nullable=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id'), ondelete='SET NULL'), nullable=True)
    quantity = db.Column(db.Integer, nullable=False)

    # many to one with User
    user = db.relationship("User", back_populates="items", passive_deletes=True)
    # many to one with Product
    product = db.relationship("Product", back_populates="items", passive_deletes=True)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'productId': self.product_id,
            'quantity': self.quantity
        }

## amzing work guys!
