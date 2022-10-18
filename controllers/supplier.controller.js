const { createSupplierService, getAllSupplierService, getSupplierByIdService, updateSupplierByIdService } = require("../services/supplier.service");


exports.createSupplier = async (req, res, next) => {
    try {
        const result = await createSupplierService(req.body);
        res.status(200).json({
            status: "success",
            message: "Successfully created the supplier",
            data: result
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            message: "Couldn't create the supplier",
            error: error.message
        })
    }
};


exports.getAllSupplier = async (req, res, next) => {
    try {
        const suppliers = await getAllSupplierService(req.body);

        res.status(200).json({
            status: "success",
            message: "Successfully get all the suppliers",
            data: suppliers
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the all suppliers",
            error: error.message
        })
    }
};


exports.getSupplierById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const supplier = await getSupplierByIdService(id);

        if (!supplier) {
            return res.status(400).json({
                status: "fail",
                error: "couldn't find the supplier with this id"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Successfully get the supplier",
            data: supplier
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the supplier",
            error: error.message
        })
    }
};


exports.updateSupplierById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateSupplierByIdService(id, req.body);

        if (!result.modifiedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't update the supplier with this id"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Successfully update the supplier ",
            data: result

        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't update the supplier",
            error: error.message
        })
    }
};