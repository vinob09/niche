from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import Product, ProductImage, db

product_delete_routes = Blueprint("product_delete", __name__)

'''DELETE a Product by product_id'''
@product_delete_routes.route("/<int:product_id>", methods=['DELETE'])
@login_required
def delete_product(product_id):
    product = Product.query.get_or_404(product_id)

    if product.seller_id == current_user.id:
        db.session.delete(product)
        db.session.commit()

        return {'message': 'Product Deleted!'}


    return {'message': 'Unauthorized'}, 403


'''DELETE an Image to a Product based on Id'''
@product_delete_routes.route("/<int:product_id>/images/<int:image_id>", methods=["DELETE"])
@login_required
def delete_image(product_id, image_id):
    product = Product.query.get(product_id)
    image = ProductImage.query.get(image_id)

    if not product:
        return {"errors": {"message": "Invalid product id"}}, 404

    if not image:
        return {"errors": {"message": "Invalid image id"}}, 404

    if product.seller_id == current_user.id:
        db.session.delete(image)
        db.session.commit()

        return {"message": "Successfully deleted image"}, 201

    return {"errors": {"message": "You must be the owner of this product to remove an image"}}, 403
