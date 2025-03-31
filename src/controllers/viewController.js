const dbPromise = require('../config/db');
const { table} = require('../utils/constants');
const { getFreeSlots } = require('../services/slotService');

exports.getSlots = async (req, res) => {
    try {
        const db = await dbPromise;
        const [rows] = await db.query(`SELECT * FROM ${table.MAIN.NAME}`);

        rows.forEach(row => {
            const doctorId= '_' + table.MAIN.COLS.DOCTOR_FIO_REF + '_RRRef';
            console.log(row[doctorId]);
            getFreeSlots(row[doctorId])
                .then(freeSlots => {
                    console.log(`Free slots for ${row[doctorId]}:`, freeSlots);
                    // freeSlots.map(freeSlot => {
                    //     console.log("-->", freeSlot);
                    // })
                })
                .catch(err => {
                    console.error('Error in getSlots --> getFreeSlots:', err);
                });
        })


        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getDoctors = async (req, res) => {
    try {
        const db = await dbPromise;
        const [rows] = await db.query(`SELECT * FROM ${table.DOCTORS.NAME}`);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPatients = async (req, res) => {
    try {
        const db = await dbPromise;
        const [rows] = await db.query(`SELECT * FROM ${table.PATIENTS.NAME}`);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProcedures = async (req, res) => {
    try {
        const db = await dbPromise;
        const [rows] = await db.query(`SELECT * FROM ${table.PROCEDURES.NAME}`);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
