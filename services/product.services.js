const Product = require('../models/Product');

exports.getProductsService = async () => {
    const products = await Product.find({})
    return products;
};


exports.postProductsService = async (data) => {
    const product = await Product.create(data)
    return product;
};


exports.updateProductByIdService = async (productId, data) => {
    const result = await Product.updateOne({ _id: productId }, { $set: data }, { runValidators: true });
    return result;
};


exports.bulkUpdateProductsService = async (data) => {
    // const result = await Product.updateMany({ _id: data.ids}, data.data, {runValidators: true});

    const products = [];
    data.ids.forEach(product => {
        products.push(Product.updateOne({ _id: product.id }, product.data));
    });
    const result = Promise.all(products);
    return result;
};


exports.deleteProductByIdService = async (id) => {
    const result = await Product.deleteOne({ _id: id });
    return result;
};


exports.bulkDeleteProductsService = async (ids) => {
    const result = await Product.deleteMany({ _id: ids });
    return result;
};