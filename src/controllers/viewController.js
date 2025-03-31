const dbPromise = require('../config/db');
const { table} = require('../utils/constants');

exports.getSlots = async (req, res) => {
    try {
        const db = await dbPromise;
        const [rows] = await db.query(`SELECT * FROM ${table.MAIN.NAME}`);
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
