const fs = require('fs').promises;
const path = require('path');

const writeFile = async (folder, file, data) => {
    try {
        await fs.writeFile(path.join(__dirname, '..', folder, file),
            JSON.stringify(data, null, 2), 'utf-8'
        );
        return true;
    } catch (error) {
        throw new Error('Error writing file');
    }
};

module.exports = {
    writeFile
};