const express = require('express');
const fs = require('fs');
const path = require('path');

const todosRouter = express.Router();

const dataPath = path.join(__dirname, '../db/tasks.json');

todosRouter.get('/', (req, res) => {
    const todos = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    res.render('todos/index', { todos });
});


todosRouter.post('/add', (req, res) => {
    const todos = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const newTodo = {
        id: Date.now(),
        title: req.body.title
    };
    todos.push(newTodo);
    fs.writeFileSync(dataPath, JSON.stringify(todos, null, 2));
    res.redirect('/');
});


todosRouter.post('/delete/:id', (req, res) => {
    let todos = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const id = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    fs.writeFileSync(dataPath, JSON.stringify(todos, null, 2));
    res.redirect('/');
});


todosRouter.get('/edit/:id', (req, res) => {
    const todos = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    res.render('todos/edit', { todo });
});

todosRouter.post('/edit/:id', (req, res) => {
    let todos = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const id = parseInt(req.params.id);
    const updatedTodos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, title: req.body.title };
        }
        return todo;
    });
    fs.writeFileSync(dataPath, JSON.stringify(updatedTodos, null, 2));
    res.redirect('/');
});

module.exports = { todosRouter };
