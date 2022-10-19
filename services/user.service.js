const User = require("../models/User")


exports.signupService = async (userInfo) => {
    const user = await User.create(userInfo);

    return user;
}

exports.loginUserByEmail = async (email) => {
    const user = await User.findOne({ email: email });
    return user;
}