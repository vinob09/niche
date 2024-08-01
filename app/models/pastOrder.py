from .db import db, environment, SCHEMA, add_prefix_for_prod


class PastOrder(db.Model):
    __tablename__ = 'past_orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    purchaser_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    total = db.Column(db.Float, nullable=False)
    purchase_date = db.Column(db.Date, nullable=False)
    has_reviewed = db.Column(db.Boolean, nullable=False)

    # many to one with User
    user = db.relationship("User", back_populates="orders")
    # one to many with OrderItem
    order_items = db.relationship("OrderItem", back_populates="order")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'productId': self.product_id,
            'review': self.review,
            'starRating': self.star_rating
        }
