const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: String,
    name: String,
    description: String
});

const Product = mongoose.model('Product', productSchema, 'products');

const product = new Product(
    {
        "id": "81dc41dc-4560-4f33-b425-b6f21b82fbd1",
        "image": "https://loremflickr.com/320/240",
        "name": "Syrup - Kahlua Chocolate",
        "description": "sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie"
      }
);

product.save();

module.exports = Product;