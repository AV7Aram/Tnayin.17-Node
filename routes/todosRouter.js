const express = require('express');
const { readData } = require('../middleware/readData');
const { writeFile } = require('../helpers/writeFile');

const todosRouter = express.Router();

todosRouter.get('/', readData, (req, res) => {
    const { todos } = res.locals;
    res.render('todos/index', { todos });
});

todosRouter.post('/add', readData, async (req, res) => {
    const { todos } = res.locals;
    const newTodo = {
        id: Date.now(),
        title: req.body.title
    };
    todos.push(newTodo);
    await writeFile('db', 'tasks.json', todos); 
    res.redirect('/');
});


todosRouter.post('/delete/:id', readData, async (req, res) => {
    let { todos } = res.locals;
    const id = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    await writeFile('db', 'tasks.json', todos);
    res.redirect('/');
});


todosRouter.get('/edit/:id', readData, async (req, res) => {
    const { todos } = res.locals;
    const todo = await todos.find(t => t.id === parseInt(req.params.id));
    res.render('edit/edit', { todo });
});

todosRouter.post('/edit/:id', readData, async (req, res) => {
    let { todos } = res.locals
    const id = parseInt(req.params.id);
    const updatedTodos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, title: req.body.title };
        }
        return todo;
    });
    await writeFile('db', 'tasks.json', updatedTodos);
    res.redirect('/');
});

module.exports = { todosRouter };
