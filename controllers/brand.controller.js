const { createBrandService, getAllBrandsService, getBrandByIdService, updateBrandByIdService } = require("../services/brand.service")

exports.createBrand = async (req, res, next) => {
    try {
        const result = await createBrandService(req.body);
        res.status(200).json({
            status: "success",
            message: "Successfully created the brand",
            data: result
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            message: "Couldn't create the brand",
            error: error.message
        })
    }
};


exports.getAllBrands = async (req, res, next) => {
    try {
        const brands = await getAllBrandsService(req.body);

        res.status(200).json({
            status: "success",
            message: "Successfully get all the brand",
            data: brands
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the all brands",
            error: error.message
        })
    }
};


exports.getBrandById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const brand = await getBrandByIdService(id);

        if (!brand) {
            return res.status(400).json({
                status: "fail",
                error: "couldn't find the brand with this id"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Successfully get the brand",
            data: brand
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the brand",
            error: error.message
        })
    }
};


exports.updateBrandById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateBrandByIdService(id, req.body);

        if (!result.modifiedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't update the brand with this id"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Successfully update the brand ",
            data: result

        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't update the brand",
            error: error.message
        })
    }
};