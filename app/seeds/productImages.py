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
    board5 = ProductImage(
        product_id=1,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/board5.jpg"
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
    portrait5 = ProductImage(
        product_id=2,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/portrait5.jpg"
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
    deskmat5 = ProductImage(
        product_id=3,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/deskmat5.jpg"
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
    charger5 = ProductImage(
        product_id=4,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/charger5.jpg"
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
    cooler5 = ProductImage(
        product_id=5,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/cooler5.jpg"
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
    rackets5 = ProductImage(
        product_id=6,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/rackets5.jpg"
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
    car5 = ProductImage(
        product_id=7,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/car5.jpg"
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
    psfive5 = ProductImage(
        product_id=8,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/psfive5.png"
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
    exhaust5 = ProductImage(
        product_id=9,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/exhaust5.jpg"
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
    kw5 = ProductImage(
        product_id=10,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/kw5.jpg"
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
    wood5 = ProductImage(
        product_id=11,
        url="https://chansbucket.s3.us-east-2.amazonaws.com/Products-Images/Products-Images/wood5.jpg"
    )

    all_images = [
        board1,
        board2,
        board3,
        board4,
        board5,
        portrait1,
        portrait2,
        portrait3,
        portrait4,
        portrait5,
        deskmat1,
        deskmat2,
        deskmat3,
        deskmat4,
        deskmat5,
        charger1,
        charger2,
        charger3,
        charger4,
        charger5,
        cooler1,
        cooler2,
        cooler3,
        cooler4,
        cooler5,
        rackets1,
        rackets2,
        rackets3,
        rackets4,
        rackets5,
        car1,
        car2,
        car3,
        car4,
        car5,
        psfive1,
        psfive2,
        psfive3,
        psfive4,
        psfive5,
        exhaust1,
        exhaust2,
        exhaust3,
        exhaust4,
        exhaust5,
        kw1,
        kw2,
        kw3,
        kw4,
        kw5,
        wood1,
        wood2,
        wood3,
        wood4,
        wood5
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
