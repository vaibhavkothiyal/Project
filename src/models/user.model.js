const { Schema, model } = require('mongoose');
const brycpt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String }


});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await brycpt.hash(this.password, 12);
    }
    try {
        const token = await jwt.sign({ _id: this._id }, "iLovecoding");
        this.token =token;
        await this.save();
        return token;
    } catch (e) {
        console.log(e.message);
    }
    next();
});


module.exports = model("userInfo", userSchema);