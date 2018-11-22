const mongoose = require('mongoose');
const {Schema} = mongoose;
require('mongoose-type-email');
const User = require('./user');

const ProductSchema = new Schema({
    name: { type: String, required: true, index: { unique: true }},
    price: {type: Number, min: 0, default: 0},
    descripcion: String,
    photo: Buffer,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    createdAt: Date,
});

ProductSchema.set('timestamps', true);

module.exports = mongoose.model('Product', ProductSchema);
