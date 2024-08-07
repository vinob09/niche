from .db import db, environment, SCHEMA, add_prefix_for_prod


class PastOrder(db.Model):
    __tablename__ = 'past_orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    purchaser_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='SET NULL'), nullable=True)
    total = db.Column(db.Float, nullable=False)
    purchase_date = db.Column(db.Date, nullable=False)
    has_reviewed = db.Column(db.Boolean, nullable=False)

    # many to one with User
    user = db.relationship("User", back_populates="orders", passive_deletes=True)
    # one to many with OrderItem
    order_items = db.relationship("OrderItem", back_populates="order")

    def to_dict(self):
        return {
            'id': self.id,
            'purchaserId': self.purchaser_id,
            'total': self.total,
            'purchaseDate': self.purchase_date,
            'hasReviewed': self.has_reviewed
        }
