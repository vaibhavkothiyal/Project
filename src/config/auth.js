const UserInfo = require('../models/user.model');
const brycpt = require("bcryptjs");
const cookie = require('cookie');


const register = async (req, res) => {
    try {
        const email = await UserInfo.findOne({ email: req.body.email });
        if (email) return res.status(402).json("email already exist");
        const user = await UserInfo.create(req.body);
        user.save();
        console.log(user)
        res.status(200).json(user)
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
};

const login = async (req, res) => {
    try {
        const email = await UserInfo.findOne({ email: req.body.email });
        if (!email) return res.status(500).json({ message: "invalid user", status: "Failed" });

        const passMatch = await brycpt.compare(req.body.password, email.password);
        if (!passMatch) return res.status(500).json({ message: "invalid user", status: "Failed" });

        res.status(200).json({
            status:200,
            token:email.token,
        });
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
}

module.exports = { register, login };