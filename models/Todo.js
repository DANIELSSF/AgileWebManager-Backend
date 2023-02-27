const { Schema, model } = require('mongoose');

const TodosSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
    },
    status: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comments",
        },
    ],
});

TodosSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();

    object.id = _id;
    return object;
});

module.exports = model('Todos', TodosSchema);