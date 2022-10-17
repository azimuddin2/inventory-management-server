const Supplier = require("../models/Supplier");

exports.createSupplierService = async (data) => {
    const result = await Supplier.create(data);
    return result;
}

exports.getAllSupplierService = async () => {
    const suppliers = await Supplier.find({});
    return suppliers;
}

exports.getSupplierByIdService = async (id) => {
    const supplier = await Supplier.findOne({ _id: id });
    return supplier;
}

exports.updateSupplierByIdService = async (id, data) => {
    const result = await Supplier.updateOne({ _id: id }, data, {
        runValidators: true
    });

    return result;
}