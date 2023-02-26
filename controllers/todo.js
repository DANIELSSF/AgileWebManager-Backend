const { response, request } = require('express');
const Todos = require('../models/Todos');

const getTodos = async (req, res = response) => {

    const todos = await Todos.find().populate("comments");

    try {
        res.status(200).json({
            ok: true,
            todos,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Contact the administrator",
        });
    }
};

const createTodos = async (req, res = response) => {

    const todo = new Todos(req.body);

    try {
        todo.comments = [];
        const todoSaved = await todo.save();

        res.status(201).json({
            ok: true,
            todo: todoSaved,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact the administrator",
        });
    }
};

const editTodo = async (req = request, res = response) => {
    const todoId = req.params.id;

    try {
        const todo = await Todos.findById(todoId);

        if (!todo) {
            return res.status(404).json({
                ok: false,
                msg: "Todo does not exist for this id",
            });
        };

        const newTodo = {
            ...req.body,
        }

        const updateTodo = await Todos.findByIdAndUpdate(todoId, newTodo, ({ new: true }));

        res.status(200).json({
            ok: true,
            todo: updateTodo,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact the administrator",
        });
    }
};

const deleteTodo = async (req, res = response) => {
    const todoId = req.params.id;

    try {
        const todo = await Todos.findById(todoId);
        if (!todo) {
            return res.status(404).json({
                ok: false,
                msg: "Todo does not exist for this id",
            });
        };

        const commentIds = todo.comments;

        await Todos.findByIdAndDelete(todoId);
        await Todos.deleteMany({ _id: { $in: commentIds } });

        res.status(201).json({
            ok: true,
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
    getTodos,
    createTodos,
    editTodo,
    deleteTodo,
}