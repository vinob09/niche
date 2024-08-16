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
    board3 = ProductImage(
        product_id=1,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/board3.jpg"
    )
    board4 = ProductImage(
        product_id=1,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/board4.jpg"
    )
    portrait1 = ProductImage(
        product_id=2,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/portrait1.jpg"
    )
    portrait2 = ProductImage(
        product_id=2,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/portrait2.jpg"
    )
    portrait3 = ProductImage(
        product_id=2,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/portrait3.jpg"
    )
    portrait4 = ProductImage(
        product_id=2,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/portrait4.jpg"
    )
    deskmat1 = ProductImage(
        product_id=3,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/deskmat1.jpg"
    )
    deskmat2 = ProductImage(
        product_id=3,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/deskmat2.jpg"
    )
    deskmat3 = ProductImage(
        product_id=3,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/deskmat3.jpg"
    )
    deskmat4 = ProductImage(
        product_id=3,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/deskmat4.jpg"
    )
    charger1 = ProductImage(
        product_id=4,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/charger1.jpg"
    )
    charger2 = ProductImage(
        product_id=4,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/charger2.jpg"
    )
    charger3 = ProductImage(
        product_id=4,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/charger3.jpg"
    )
    charger4 = ProductImage(
        product_id=4,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/charger4.jpg"
    )
    cooler1 = ProductImage(
        product_id=5,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/cooler1.jpg"
    )
    cooler2 = ProductImage(
        product_id=5,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/cooler2.jpg"
    )
    cooler3 = ProductImage(
        product_id=5,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/cooler3.jpg"
    )
    cooler4 = ProductImage(
        product_id=5,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/cooler4.jpg"
    )
    rackets1 = ProductImage(
        product_id=6,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/rackets1.jpg"
    )
    rackets2 = ProductImage(
        product_id=6,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/rackets2.jpg"
    )
    rackets3 = ProductImage(
        product_id=6,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/rackets3.jpg"
    )
    rackets4 = ProductImage(
        product_id=6,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/rackets4.jpg"
    )
    car1 = ProductImage(
        product_id=7,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/car1.jpg"
    )
    car2 = ProductImage(
        product_id=7,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/car2.jpg"
    )
    car3 = ProductImage(
        product_id=7,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/car3.jpg"
    )
    car4 = ProductImage(
        product_id=7,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/car4.jpg"
    )
    psfive1 = ProductImage(
        product_id=8,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/psfive1.jpg"
    )
    psfive2 = ProductImage(
        product_id=8,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/psfive2.jpg"
    )
    psfive3 = ProductImage(
        product_id=8,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/psfive3.jpg"
    )
    psfive4 = ProductImage(
        product_id=8,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/psfive4.jpg"
    )
    exhaust1 = ProductImage(
        product_id=9,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/exhaust1.jpg"
    )
    exhaust2 = ProductImage(
        product_id=9,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/exhaust2.jpg"
    )
    exhaust3 = ProductImage(
        product_id=9,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/exhaust3.jpg"
    )
    exhaust4 = ProductImage(
        product_id=9,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/exhaust4.jpg"
    )
    kw1 = ProductImage(
        product_id=10,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/kw1.jpg"
    )
    kw2 = ProductImage(
        product_id=10,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/kw2.jpg"
    )
    kw3 = ProductImage(
        product_id=10,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/kw3.jpg"
    )
    kw4 = ProductImage(
        product_id=10,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/kw4.jpg"
    )
    wood1 = ProductImage(
        product_id=11,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/wood1.jpg"
    )
    wood2 = ProductImage(
        product_id=11,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/wood2.jpg"
    )
    wood3 = ProductImage(
        product_id=11,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/wood3.jpg"
    )
    wood4 = ProductImage(
        product_id=11,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/wood4.jpg"
    )

    all_images = [
        board1,
        board2,
        board3,
        board4,
        portrait1,
        portrait2,
        portrait3,
        portrait4,
        deskmat1,
        deskmat2,
        deskmat3,
        deskmat4,
        charger1,
        charger2,
        charger3,
        charger4,
        cooler1,
        cooler2,
        cooler3,
        cooler4,
        rackets1,
        rackets2,
        rackets3,
        rackets4,
        car1,
        car2,
        car3,
        car4,
        psfive1,
        psfive2,
        psfive3,
        psfive4,
        exhaust1,
        exhaust2,
        exhaust3,
        exhaust4,
        kw1,
        kw2,
        kw3,
        kw4,
        wood1,
        wood2,
        wood3,
        wood4
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
