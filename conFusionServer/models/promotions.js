const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const promoSchema = new Schema ({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
    },
    lablel: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false
    },
}, {
    timestamp: true
});

var Promotions = mongoose.model('Promotion',promoSchema);

module.exports = Promotions;

/*
      "name": "Weekend Grand Buffet",
      "image": "images/buffet.png",
      "label": "New",
      "price": "19.99",
      "description": "Featuring . . .",
      "featured": false
*/