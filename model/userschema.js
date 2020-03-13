const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: { type: String },
    age: { type: Number },
    email: { type: String, unique: true },
})
module.exports = mongoose.model('user',UserSchema);