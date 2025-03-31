const cron = require('node-cron');
const dbPromise = require('../config/db');
const { table} = require('../utils/constants');

cron.schedule('* * * * *', async () => {
    try {
        const db = await dbPromise;
        const [rows] = await db.query(`SELECT * FROM ${table.MAIN.NAME}`);
        console.log(rows);
    } catch (err) {
        console.error('Error fetching data:', err);
    }
});
