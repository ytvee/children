const db = require('../../config/dbConfig');

exports.getSlotsFromDb = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM _InfoRg970 WHERE Fld1043 IS NULL', (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};
