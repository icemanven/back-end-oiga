const mongoose = require('mongoose');
const { Schema} = mongoose;
require('mongoose-type-email');
const Product = require('./product');
const User = require('./user');

const OrderSchema = new Schema({
    subject: { type: String, required: true},
    company: {type: Schema.Types.ObjectId, ref: 'User'},
    total: {type: Number, min: 0, default: 0},
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
    createdAt: Date
});

OrderSchema.set('timestamps', true);

module.exports = mongoose.model('Order', OrderSchema);
