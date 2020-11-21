const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

const leaderSchema = new Schema ({
    name: {
        type: String,
        require: true,
        unique: true
    },
    image: {
        type: String,
        require: true,
    },
    designation: {
        type: String,
        require: true,
    },
    abbr: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true    
    },
    featured: {
        type: Boolean,
        default: false,
    },
}, {
    timestamp: true
});

var Leaders = mongoose.model('Leaders', leaderSchema);

module.exports = Leaders;

/*
{
      "name": "Peter Pan",
      "image": "images/alberto.png",
      "designation": "Chief Epicurious Officer",
      "abbr": "CEO",
      "description": "Our CEO, Peter, . . .",
      "featured": false
}
*/ 