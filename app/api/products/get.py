from flask import Blueprint, render_template
#IMPORT FORMS
from app.models import Product

product_routes = Blueprint("products", __name__)

'''GET all products'''
product_routes.route("/products", methods=['GET'])
def get_all_products():
    products = Product.query.all()
    '''LANDING PAGE TO TAKE IN products'''
    return render_template('/products', products=products)