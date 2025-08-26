const express = require('express');
const path = require('path');
const { todosRouter } = require('./routes/todosRouter');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('views/todos'));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/', todosRouter);

app.listen(port, () => {
    console.log(`Server is running on ${port} port`);
});
