from .db import db, environment, SCHEMA
from user import User

class PastOrder(db.Model):
    __tablename__ = 'past_orders'

    id = db.Column(db.Integer, primary_key=True)
    purchaser_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    total = db.Column(db.Decimal, nullable=False)
    purchase_date = db.Column(db.Date, nullable=False)
    has_reviewed = db.Column(db.Boolean, nullable=False)