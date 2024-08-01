from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo1 = Review(
        user_id=2,
        product_id=1,
        review='very sturdy, good quality',
        star_rating=5
        )
    demo2 = Review(
        user_id=3,
        product_id=6,
        review='great price for the quantity!',
        star_rating=5
        )
    demo3 = Review(
        user_id=2,
        product_id=6,
        review='very safe and fun for the kids!',
        star_rating=5
        )
    demo4 = Review(
        user_id=1,
        product_id=9,
        review='Great sounding exhaust!',
        star_rating=5
        )
    demo5 = Review(
        user_id=1,
        product_id=10,
        review='Heard a lot of good things about them but cannot decide if they are worth the price',
        star_rating=4
        )

    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
