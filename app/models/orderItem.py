from .db import db, environment, SCHEMA
# from .pastOrder import PastOrder
# from .product import Product

class OrderItem(db.Model):
    __tablename__ = 'order_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('past_orders.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    # many to one with PastOrder
    order = db.relationship("PastOrder", back_populates="order_items")
    # many to one with Product
    product = db.relationship("Product", back_populates="order_items")

    def to_dict(self):
        return {
            'id': self.id,
            'orderId': self.order_id,
            'productId': self.product_id,
            'quantity': self.quantity
        }
