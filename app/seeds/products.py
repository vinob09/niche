from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_products():
    board = Product(
        seller_id=1,
        category_id=1,
        name="Charcuterie Board",
        description='Premium Top Grain cheese boards',
        price=20.00,
        )
    portrait = Product(
        seller_id=2,
        category_id=1,
        name='Watercolor Pet Portrait',
        description='The PERFECT Handmade Christmas Gift For Pet Parents',
        price=7
        )
    deskmat = Product(
        seller_id=1,
        category_id=2,
        name='Leather Desk Mat',
        description='Our leather desk pad is a sophisticated and functional accessory designed to enhance your workspace.',
        price=20
        )
    charger = Product(
        seller_id=3,
        category_id=2,
        name='Personalized Walnut Wood iPhone Apple Watch Airpods Wireless Charger',
        description='This handmade walnut wood 4 in 1 wireless charger is the perfect combination of form and function.',
        price=40
        )
    cooler = Product(
        seller_id=1,
        category_id=3,
        name='Coleman 316 Series Insulated Portable Cooler',
        description='FULLY INSULATED: Lid and body Keeps the Ice up to 5 days in temperatures as high as 90°F; logo color on cooler may vary',
        price=109
        )
    rackets = Product(
        seller_id=2,
        category_id=3,
        name='2 Players Tennis Rackets',
        description='2 Players Tennis Rackets',
        price=40
        )
    car = Product(
        seller_id=1,
        category_id=4,
        name='Kids Ride on Car Truck',
        description='12V 7Ah Kids Electric Vehicles Car Ride on Toy for Toddlers 3-5 with Remote Control',
        price=40
        )
    psfive = Product(
        seller_id=3,
        category_id=4,
        name='PlayStation®5 console (slim)',
        description='Includes DualSense Wireless Controller, 1TB SSD, Disc Drive, 2 Horizontal Stand Feet, HDMI Cable, AC power cord, USB cable',
        price=449
        )
    exhaust = Product(
        seller_id=2,
        category_id=5,
        name='BMW F30 / F22 / F36 / F32 Valved Sport Exhaust',
        description='BMW F30 / F22 / F36 / F32 Valved Sport Exhaust System (Axleback) F chassis',
        price=1099
        )
    kw = Product(
        seller_id=1,
        category_id=5,
        name='KW  VARIANT 3 COIL-OVER',
        description="Race technology for the road with adjustable compression and rebound damping",
        price=2454
        )


    db.session.add(board)
    db.session.add(portrait)
    db.session.add(deskmat)
    db.session.add(charger)
    db.session.add(cooler)
    db.session.add(rackets)
    db.session.add(car)
    db.session.add(psfive)
    db.session.add(exhaust)
    db.session.add(kw)
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
