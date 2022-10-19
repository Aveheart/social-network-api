const {Schema, Types} = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    userName: {
        type: Date,
        default: Date.now,
    },
},
{
    toJSON: {
        getters: true
    },
    id: false
});
module.exports = reactionSchema;