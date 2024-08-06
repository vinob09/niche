from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text


# Adding product_images seeder data
def seed_images():
    board1 = ProductImage(
        product_id=1,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/board1.jpg"
    )
    board2 = ProductImage(
        product_id=1,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/board2.jpg"
    )
    portrait1 = ProductImage(
        product_id=2,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/portrait1.jpg"
    )
    portrait2 = ProductImage(
        product_id=2,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/portrait2.jpg"
    )
    deskmat1 = ProductImage(
        product_id=3,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/deskmat1.jpg"
    )
    deskmat2 = ProductImage(
        product_id=3,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/deskmat2.jpg"
    )
    charger1 = ProductImage(
        product_id=4,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/charger1.jpg"
    )
    charger2 = ProductImage(
        product_id=4,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/charger2.jpg"
    )
    cooler1 = ProductImage(
        product_id=5,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/cooler1.jpg"
    )
    cooler2 = ProductImage(
        product_id=5,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/cooler2.jpg"
    )
    rackets1 = ProductImage(
        product_id=6,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/rackets1.jpg"
    )
    rackets2 = ProductImage(
        product_id=6,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/rackets2.jpg"
    )
    car1 = ProductImage(
        product_id=7,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/car1.jpg"
    )
    car2 = ProductImage(
        product_id=7,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/car2.jpg"
    )
    psfive1 = ProductImage(
        product_id=8,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/psfive1.jpg"
    )
    psfive2 = ProductImage(
        product_id=8,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/psfive2.jpg"
    )
    exhaust1 = ProductImage(
        product_id=9,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/exhaust1.jpg"
    )
    exhaust2 = ProductImage(
        product_id=9,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/exhaust2.jpg"
    )
    kw1 = ProductImage(
        product_id=10,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/kw1.jpg"
    )
    kw2 = ProductImage(
        product_id=10,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/kw2.jpg"
    )

    all_images = [
        board1,
        board2,
        portrait1,
        portrait2,
        deskmat1,
        deskmat2,
        charger1,
        charger2,
        cooler1,
        cooler2,
        rackets1,
        rackets2,
        car1,
        car2,
        psfive1,
        psfive2,
        exhaust1,
        exhaust2,
        kw1,
        kw2
    ]

    add_all_images = [db.session.add(image) for image in all_images]
    print("All images added")

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))

    db.session.commit()
