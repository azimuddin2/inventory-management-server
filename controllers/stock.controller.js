const { getStocksService, getStockByIdService, postStockService, updateStockByIdService, bulkUpdateStockService, deleteStockByIdService, bulkDeleteStockService } = require("../services/stock.service");


exports.getStocks = async (req, res, next) => {
    try {

        let filters = { ...req.query };

        // sort, page, limit => exclude
        const excludeFields = ['sort', 'page', 'limit'];
        excludeFields.forEach(field => delete filters[field])

        
        let filtersString = JSON.stringify(filters);
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        filters = JSON.parse(filtersString);

        const queries = {};
        if (req.query.sort) {
            // price,quantity => 'price quantity'
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields;
        }

        if (req.query.page) {
            const { page = 1, limit = 6 } = req.query;

            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit);
        }

        const stocks = await getStocksService(filters, queries);

        res.status(200).json({
            status: "success",
            message: "Data load successfully",
            data: stocks
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "can't get the data",
            error: error.message
        });
    }
};


exports.getStockById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await getStockByIdService(id);

        res.status(200).json({
            status: "Success",
            message: "Data load successfully",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "can't get the data",
            error: error.message
        });
    }
};


exports.postStock = async (req, res, next) => {
    try {
        // save or create
        const result = await postStockService(req.body)

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


exports.updateStockById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateStockByIdService(id, req.body)

        res.status(200).json({
            status: "success",
            message: "Successfully updated the stock",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't update the stock",
            error: error.message
        })
    }
};


exports.bulkUpdateStock = async (req, res, next) => {
    try {
        const result = await bulkUpdateStockService(req.body);

        res.status(200).json({
            status: "success",
            message: "Successfully updated the stocks",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't update the stocks",
            error: error.message
        });
    }
};


exports.deleteStockById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteStockByIdService(id);
        if (!result.deletedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't delete the stock"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Successfully deleted the stock",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "couldn't delete the stock",
            error: error.message
        });
    }
};


exports.bulkDeleteStock = async (req, res, next) => {
    try {
        const result = bulkDeleteStockService(req.body.ids);

        res.status(200).json({
            status: "success",
            message: "Successfully deleted the given stocks",
            data: result
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't delete the given stocks",
            error: error.message
        });
    }
};


exports.fileUpload = async (req, res, next) => {
    try {
        res.status(200).json(req.files);
    } catch (error) {

    }
};