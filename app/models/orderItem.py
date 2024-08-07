from .db import db, environment, SCHEMA, add_prefix_for_prod


class OrderItem(db.Model):
    __tablename__ = 'order_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('past_orders.id'), ondelete='SET NULL'), nullable=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id'), ondelete='SET NULL'), nullable=True)
    quantity = db.Column(db.Integer, nullable=False)

    # many to one with PastOrder
    order = db.relationship("PastOrder", back_populates="order_items", passive_deletes=True)
    # many to one with Product
    product = db.relationship("Product", back_populates="order_items", passive_deletes=True)

    def to_dict(self):
        return {
            'id': self.id,
            'orderId': self.order_id,
            'productId': self.product_id,
            'quantity': self.quantity
        }
