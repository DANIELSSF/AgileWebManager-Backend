const { Schema, model } = require('mongoose');

const CommentsSchema = Schema = ({
    comment: {
        type: String,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    date: {
        type: Date,
        require: true,
    },

});

EventsSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();

    object.id = _id;
    return object;
});

module.exports = model('Comments', CommentsSchema);