from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_products():
    demo = Product(
        seller_id=1,
        category_id=1,
        name="Charcuterie Board",
        description='Premium Top Grain cheese boards',
        price=20.00,
        )
    demo = Product(
        seller_id=2,
        category_id=1,
        name='Watercolor Pet Portrait',
        description='The PERFECT Handmade Christmas Gift For Pet Parents',
        price=7
        )
    demo = Product(
        seller_id=1
        category_id=2
        name='Leather Desk Mat'
        description=
        price=
        )
    demo = Product(
        seller_id=3
        category_id=2
        name=
        description=
        price=
        )
    demo = Product(
        seller_id=1
        category_id=3
        name=
        description=
        price=
        )
    demo = Product(
        seller_id=2
        category_id=3
        name=
        description=
        price=
        )
    demo = Product(
        seller_id=1
        category_id=4
        name=
        description=
        price=
        )
    demo = Product(
        seller_id=3
        category_id=4
        name=
        description=
        price=
        )
    demo = Product(
        seller_id=1
        category_id=5
        name=
        description=
        price=
        )
    demo = Product(
        seller_id=2
        category_id=5
        name=
        description=
        price=
        )


    db.session.add()
    db.session.add()
    db.session.add()
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
