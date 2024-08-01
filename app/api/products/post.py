from flask import Blueprint
from flask_login import current_user, login_required
from app.models import Product, db
from app.forms import ProductDetailForm #TO BE CREATED

product_post_routes = Blueprint("product_post", __name__)

