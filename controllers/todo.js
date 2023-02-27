const { response, request } = require('express');
const Todo = require('../models/Todo');
const Table = require('../models/Table');

const getTodos = async (req, res = response) => {

    const todos = await Todo.find().populate("comments");

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

    const { tableId, todo } = req.body;

    try {

        const newTodo = new Todo({ todo });
        todo.comments = [];
        const todoSaved = await todo.save();

        const table = await Table.findById(tableId);
        table.todo.push(todoSaved._id);
        await table.save();

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
        const todo = await Todo.findById(todoId);

        if (!todo) {
            return res.status(404).json({
                ok: false,
                msg: "Todo does not exist for this id",
            });
        };

        const newTodo = {
            ...req.body,
        }

        const updateTodo = await Todo.findByIdAndUpdate(todoId, newTodo, ({ new: true }));

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
        const todo = await Todo.findById(todoId);
        if (!todo) {
            return res.status(404).json({
                ok: false,
                msg: "Todo does not exist for this id",
            });
        };

        const commentIds = todo.comments;

        await Todo.findByIdAndDelete(todoId);
        await Todo.deleteMany({ _id: { $in: commentIds } });

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