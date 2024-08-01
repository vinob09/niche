from app.models import db, PastOrder, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_pastOrder():
    order1 = PastOrder(
        purchaser_id=1,
        total=40,
        purchase_date='2024-07-31',
        has_reviewed=0
        )

    db.session.add(order1)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_pastOrder():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.past_orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM past_orders"))

    db.session.commit()
