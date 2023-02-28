const { Schema, model } = require('mongoose');

const CommentsSchema = Schema ({
    comment: {
        type: String,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    todo: {
        type: Schema.Types.ObjectId,
        ref: 'Todo',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },

});

CommentsSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();

    object.id = _id;
    return object;
});

module.exports = model('Comment', CommentsSchema);