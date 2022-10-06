const { getProductsService, postProductsService, bulkUpdateProductsService, updateProductByIdService, deleteProductByIdService, bulkDeleteProductsService } = require("../services/product.services")


exports.getProducts = async (req, res, next) => {
    try {
        // const products = await Product
        // .where("name").equals(/\w/)
        // .where("quantity").gt(100).lt(600)
        // .limit(2).sort({quantity: -1});

        const products = await getProductsService()

        res.status(200).json({
            status: "success",
            message: "Data load successfully",
            data: products
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "can't get the data",
            error: error.message
        })
    }
};


exports.postProduct = async (req, res, next) => {
    try {
        // save or create
        const result = await postProductsService(req.body)

        res.status(200).json({
            status: "success",
            message: "Data inserted successfully!",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Data is not inserted",
            error: error.message
        })
    }
};


exports.updateProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateProductByIdService(id, req.body)

        res.status(200).json({
            status: "success",
            message: "Successfully updated the product",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't update the product",
            error: error.message
        })
    }
};


exports.bulkUpdateProduct = async (req, res, next) => {
    try {
        const result = await bulkUpdateProductsService(req.body);

        res.status(200).json({
            status: "success",
            message: "Successfully updated the products",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't update the products",
            error: error.message
        });
    }
};


exports.deleteProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteProductByIdService(id);
        if (!result.deletedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't delete the product"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Successfully deleted the product",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "couldn't delete the product",
            error: error.message
        });
    }
};


exports.bulkDeleteProduct = async (req, res, next) => {
    try {
        const result = bulkDeleteProductsService(req.body.ids);

        res.status(200).json({
            status: "success",
            message: "Successfully deleted the given products",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't delete the given products",
            error: error.message
        });
    }
};