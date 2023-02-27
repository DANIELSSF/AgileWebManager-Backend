const { response } = require('express');
const Comment = require('../models/Comment');
const Todos = require('../models/Todo');

const createComment = async (req, res = response) => {
    const { todoId, comment } = req.body;

    try {
        const newComment = new Comment({
            comment,
            date: new Date(),
            creator: req.uid,
        });
        const commentSaved = await newComment.save();

        const todo = await Todos.findById(todoId);
        todo.comments.push(commentSaved._id);
        await todo.save();


        res.status(201).json({
            ok: true,
            comment: commentSaved,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Contact the administrator",
        });
    }
};

module.exports = {
    createComment,
}