from .db import db, environment, SCHEMA, add_prefix_for_prod

class Category(db.Model):
    __tablename__ = 'categories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(40), nullable=False)

    # one to many with Product
    products = db.relationship("Product", back_populates="category")


    def to_dict(self):
        return {
            'id': self.id,
            'categoryName': self.category_name
        }

## you are ready to be engineers!
