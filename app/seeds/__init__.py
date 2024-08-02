from flask.cli import AppGroup
from .users import seed_users, undo_users
from .categories import seed_category, undo_category
from .products import seed_products, undo_product
from .reviews import seed_review, undo_review
from .favorites import seed_favorite, undo_favorite
from .orderItems import seed_order_items, undo_order_items
from .pastOrders import seed_past_orders, undo_past_orders
from .cartItems import seed_cart_items, undo_cart_items

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_cart_items()
        undo_order_items()
        undo_past_orders()
        undo_favorite()
        undo_review()
        undo_product()
        undo_category()
        undo_users()
    seed_users()
    seed_category()
    seed_products()
    seed_review()
    seed_favorite()
    seed_past_orders()
    seed_order_items()
    seed_cart_items()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
        undo_cart_items()
        undo_order_items()
        undo_past_orders()
        undo_favorite()
        undo_review()
        undo_product()
        undo_category()
        undo_users()
    # Add other undo functions here
