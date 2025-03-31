const dbPromise = require('../config/db');
const { table } = require('../utils/constants');

exports.getFreeSlots = async (doctorId) => {
    const db = await dbPromise;
    const doctorRefId = '_' + table.MAIN.COLS.DOCTOR_FIO_REF + '_RRRef';

    const [appointments] = await db.query(`
        SELECT ${table.MAIN.COLS.START_TIME}, ${table.MAIN.COLS.END_TIME} 
        FROM ${table.MAIN.NAME} 
        WHERE ${doctorRefId} = ?`, [doctorId]);

    const workStartTime = new Date();
    workStartTime.setHours(9, 0, 0, 0);

    const workEndTime = new Date();
    workEndTime.setHours(18, 0, 0, 0);

    let freeSlots = [];
    let currentTime = new Date(workStartTime);

    appointments.forEach((appointment) => {
        const appointmentStart = new Date(appointment[table.MAIN.COLS.START_TIME]);
        const appointmentEnd = new Date(appointment[table.MAIN.COLS.END_TIME]);

        while (currentTime < appointmentStart) {
            freeSlots.push(formatSlot(currentTime));
            currentTime.setMinutes(currentTime.getMinutes() + 40);
        }

        currentTime = new Date(appointmentEnd);
    });

    while (currentTime < workEndTime) {
        freeSlots.push(formatSlot(currentTime));
        currentTime.setMinutes(currentTime.getMinutes() + 40);
    }

    return freeSlots;
};

const formatSlot = (startDate) => {
    const startTime = formatTime(startDate);
    const endTime = formatTime(new Date(startDate.getTime() + 40 * 60000));

    return {
        startTime,
        endTime,
        timeView: `с ${startTime} до ${endTime}`
    };
};

const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};
