const { createCategoryService, getAllCategoryService, getCategoryByIdService, updatedCategoryByIdService } = require("../services/category.service")

exports.createCategory = async (req, res, next) => {
    try {
        const result = await createCategoryService(req.body);

        res.status(200).json({
            status: "success",
            message: "Successfully create the category",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't create the category",
            error: error.message
        })
    }
};


exports.getAllCategory = async (req, res, next) => {
    try {
        const categories = await getAllCategoryService(req.body);

        res.status(200).json({
            status: "success",
            message: "Successfully get the all category",
            data: categories
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the all category",
            error: error.message
        })
    }
};


exports.getCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await getCategoryByIdService(id);

        if (!category) {
            return res.status(400).json({
                status: "fail",
                error: "couldn't find the category with this id"
            })
        };

        res.status(200).json({
            status: "success",
            message: "Successfully get the category",
            data: category
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the category",
            error: error.message
        })
    }
};


exports.updatedCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updatedCategoryByIdService(id, req.body);

        if (!result.modifiedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't update the category with this id"
            })
        };

        res.status(200).json({
            status: "success",
            message: "Successfully update the category",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't update the category",
            error: error.message
        })
    }
};