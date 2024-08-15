from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import Product, Category, db
from app.forms.product_form import ProductForm

product_put_routes = Blueprint("product_put", __name__)

'''PUT/EDIT an Existing Product by product_id'''
@product_put_routes.route("/<int:product_id>", methods=['PUT'])
@login_required
def edit_product(product_id):
    product = Product.query.get_or_404(product_id)


    if product.seller_id == current_user.id:
        form = ProductForm()
        form.category_id.options = [(category.id) for category in Category.query.all()]
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            product.name = form.data['name']
            product.description = form.data['description']
            product.price = form.data['price']
            product.category_id = form.data['category_id']

            db.session.commit()
            return jsonify(product.to_dict())

        return jsonify(form.errors), 400

    return {'message': 'Unauthorized'}, 403
