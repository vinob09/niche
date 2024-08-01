from flask import Flask, Blueprint, render_template, redirect, url_for
from flask_migrate import Migrate
#IMPORT FORMS
from app.config import Config
from app.models import db, Product, Review, ProductImage, Favorite
from sqlalchemy.orm import joinedload

product_routes = Blueprint("products", __name__)

'''GET all products'''
product_routes.route("/products", methods=['GET'])
def get_all_products():
    products = Product.query.all()
    '''LANDING PAGE TO TAKE IN products'''
    return render_template('/products', products=products)






