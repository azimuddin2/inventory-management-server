const Stock = require('../models/Stock');

exports.getStocksService = async (filters, queries) => {
    const stocks = await Stock.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)
    const totalStocks = await Stock.countDocuments(filters);
    const page = Math.ceil(totalStocks / queries.limit);

    return { totalStocks, page, stocks };
};


exports.getStockByIdService = async (id) => {
    const stock = await Stock.findOne({ _id: id }).populate('store.id').populate('suppliedBy.id').populate('brand.id');
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