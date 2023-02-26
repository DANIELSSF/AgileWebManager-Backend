const { response } = require('express');
const Comment = require('../models/Comments');

const createComment = async (req, res = response) => {
    const comment = new Comment(req.body);

    try {
        const commentSaved = await comment.save();

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