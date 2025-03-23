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

exports.getOccupiedSlots = () => {
    return new Promise((resolve, reject) => {
        const query = `
      SELECT Fld1043 AS startTime, Fld1044 AS endTime 
      FROM _InfoRg970 
      WHERE Fld1043 IS NOT NULL AND Fld1044 IS NOT NULL`;
        db.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};
