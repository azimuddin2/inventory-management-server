const { createStoreService, getAllStoresService, getStoreByIdService, updateStoreByIdService } = require("../services/store.service")

exports.createStore = async (req, res, next) => {
    try {
        const result = await createStoreService(req.body);

        res.status(200).json({
            status: "success",
            message: "Successfully create the store",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't create the store",
            error: error.message
        })
    }
};


exports.getAllStores = async (req, res, next) => {
    try {
        const stores = await getAllStoresService(req.body);

        res.status(200).json({
            status: "success",
            message: "Successfully get the all stores",
            data: stores
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the stores",
            error: error.message
        })
    }
};


exports.getStoreById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const store = await getStoreByIdService(id);

        if (!store) {
            return res.status(400).json({
                status: "fail",
                error: "couldn't find the brand with this id"
            })
        };

        res.status(200).json({
            status: "success",
            message: "Couldn't get the store",
            data: store
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the store",
            error: error.message
        })
    }
};


exports.updateStoreById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateStoreByIdService(id, req.body);

        if (!result.modifiedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't update the brand with this id"
            })
        };

        res.status(200).json({
            status: 'success',
            message: "Successfully update the store",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't update the store",
            error: error.message
        })
    }
};