const readData = async (req, res, next) => {
    const { readFile } = require('../helpers/readFile');
    const { sendResponse } = require('../helpers/sendResponse');

    await readFile('db', 'tasks.json')
        .then(data => {
            res.locals.todos = JSON.parse(data);
            next();
        })
        .catch(err => {
            sendResponse(res, 500, { message:  'Error reading users data' });
        });
}

module.exports.readData = readData;