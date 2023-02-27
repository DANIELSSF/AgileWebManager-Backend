const { response } = require('express');
const Comment = require('../models/Comment');
const Todos = require('../models/Todo');

const createComment = async (req, res = response) => {
    const { todoId, ...comment } = req.body;

    try {
        const newComment = new Comment({
            ...comment,
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

const getComments = async (req,res = response) =>{
    
    const comments = await Comment.find().populate("creator", "name");

    try {
        res.status(200).json({
            ok: true,
            comments,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Contact the administrator",
        });
    }
}


const deleteComment = async (req,res = response) =>{
    const commentId = req.params.id;
  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        ok: false,
        msg: "no comment with this id was found",
      });
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({
      ok: true,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Talk to the administrator",
    });
  }
}

module.exports = {
    createComment,
    deleteComment,
    getComments
}