const db = require('../../config/dbConfig');
const db_names = require('./src/utils/constants');

exports.getSlotsFromDb = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM ${db_names.MAIN_TABLE} WHERE ${db_names.queries.START_TIME} IS NULL`, (err, results) => {
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
      SELECT ${db_names.queries.START_TIME} AS startTime, ${db_names.queries.END_TIME} AS endTime 
      FROM ${db_names.MAIN_TABLE} 
      WHERE ${db_names.queries.START_TIME} IS NOT NULL AND ${db_names.queries.END_TIME} IS NOT NULL`;
        db.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};
