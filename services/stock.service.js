const Stock = require('../models/Stock');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.getStocksService = async (filters, queries) => {
    // const stocks = await Stock.find(filters)
    //     .skip(queries.skip)
    //     .limit(queries.limit)
    //     .select(queries.fields)
    //     .sort(queries.sortBy)


    // Aggregation Operations
    const stocks = await Stock.aggregate([
        { $match: {} },
        // {
        //     $project: {
        //         store: 1,
        //         price: { $convert: { input: '$price', to: 'int' } },
        //         quantity: 1
        //     }
        // },
        {
            $group: {
                _id: '$store.name',
                totalProductPrice: { $sum: { $multiply: ['$price', '$quantity'] } }
            }
        }

    ]);


    const totalStocks = await Stock.countDocuments(filters);
    const page = Math.ceil(totalStocks / queries.limit);

    return { totalStocks, page, stocks };
};


exports.getStockByIdService = async (id) => {
    // const stock = await Stock.findOne({ _id: id })
    //     .populate('store.id')
    //     .populate('suppliedBy.id')
    //     .populate('brand.id');


    // Aggregation Operations 
    const stock = await Stock.aggregate([
        { $match: { _id: ObjectId(id) } },
        {
            $project: {
                name: 1,
                category: 1,
                quantity: 1,
                price: 1,
                productId: 1,
                'brand.name': { $toLower: '$brand.name' }
            }
        },
        {
            $lookup: {
                from: 'brands',
                localField: 'brand.name',
                foreignField: 'name',
                as: 'brandDetails'
            }
        }
    ]);

    return stock;
};


exports.postStockService = async (data) => {
    const stock = await Stock.create(data);
    return stock;
};


exports.updateStockByIdService = async (stockId, data) => {
    const result = await Stock.updateOne({ _id: stockId }, { $set: data }, { runValidators: true });
    return result;
};


exports.bulkUpdateStockService = async (data) => {
    // const result = await Product.updateMany({ _id: data.ids}, data.data, {runValidators: true});

    const stocks = [];
    data.ids.forEach(stock => {
        stocks.push(Stock.updateOne({ _id: stock.id }, stock.data));
    });
    const result = Promise.all(stocks);
    return result;
};


exports.deleteStockByIdService = async (id) => {
    const result = await Stock.deleteOne({ _id: id });
    return result;
};


exports.bulkDeleteStockService = async (ids) => {
    const result = await Stock.deleteMany({ _id: ids });
    return result;
};