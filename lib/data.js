const fs = require('fs');
const path = require('path');
const config = require('./config');

const data = {
    baseDir: path.join(__dirname, '/../.data'),

    read: (dir, file) => {
        try {
            const filepath = path.join(data.baseDir, dir, `${file}.json`);
            return JSON.parse(fs.readFileSync(filepath, 'utf8'));
        } catch {
            return false;
        }
    },

    write: (dir, file, content) => {
        try {
            const filepath = path.join(data.baseDir, dir, `${file}.json`);
            fs.writeFileSync(filepath, JSON.stringify(content, null, 2), 'utf8');
            return true;
        } catch {
            return false;
        }
    },
};

module.exports = data;
