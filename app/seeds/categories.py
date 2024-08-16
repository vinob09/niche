from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_category():
    home = Category(
        category_name='Home'
        )
    office = Category(
        category_name='Office'
        )
    outdoors = Category(
        category_name='Outdoors'
        )
    kids = Category(
        category_name='Kids'
        )
    automotive = Category(
        category_name='Automotive'
        )


    db.session.add(home)
    db.session.add(office)
    db.session.add(outdoors)
    db.session.add(kids)
    db.session.add(automotive)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_category():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
