const Category = require("../models/Category")

exports.createCategoryService = async (data) => {
    const result = await Category.create(data);
    return result;
}

exports.getAllCategoryService = async () => {
    const result = await Category.find({});
    return result;
}

exports.getCategoryByIdService = async (id) => {
    const category = await Category.findOne({ _id: id });
    return category;
}

exports.updatedCategoryByIdService = async (id, data) => {
    const result = await Category.updateOne({ _id: id }, data, {
        runValidators: true
    });
    return result;
} 