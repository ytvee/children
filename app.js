const mysql = require('mysql2');
const axios = require('axios');
const xml2js = require('xml2js');
const fs = require('fs');

const db = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: '',
});

async function getDoctorsSchedule() {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT _Fld1040_RRRef, _Fld1043, _Fld1044 FROM users WHERE _Fld1040_RRRef IS NOT NULL AND _Fld1043 IS NOT NULL AND _Fld1044 IS NOT NULL`,
            (err, results) => {
                if (err) return reject(err);
                resolve(results);
            }
        );
    });
}

function calculateAvailableSlots(schedule) {
    const availableSlots = [];
    const workStartTime = 9 * 60;
    const workEndTime = 18 * 60;

    schedule.forEach((entry) => {
        const startTime = convertToMinutes(entry._Fld1043);
        const endTime = convertToMinutes(entry._Fld1044);
        const procedureDuration = (endTime - startTime) / 60;

        for (let i = startTime; i < endTime; i += 40) {
            if (i + 40 <= workEndTime) {
                availableSlots.push({
                    doctorId: entry._Fld1040_RRRef,
                    start: i,
                    end: i + 40,
                });
            }
        }
    });

    return availableSlots;
}

function convertToMinutes(dateString) {
    const date = new Date(dateString);
    return date.getHours() * 60 + date.getMinutes();
}

async function sendAvailableSlotsToSberHealth(slots) {
    const url = 'https://api.sberhealth.ru/book';
    try {
        const response = await axios.post(url, {
            slots: slots,
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при отправке данных в СберЗдоровье:', error);
    }
}

function createXmlForAppointment(appointment) {
    const builder = new xml2js.Builder();
    const xml = builder.buildObject(appointment);

    fs.writeFileSync('./appointments.xml', xml);
    console.log('XML-файл для записи пациента создан.');
}

async function main() {
    try {
        const schedule = await getDoctorsSchedule();
        const availableSlots = calculateAvailableSlots(schedule);
        const response = await sendAvailableSlotsToSberHealth(availableSlots);
        console.log('Слоты успешно отправлены в СберЗдоровье:', response);

        const appointment = {
            patientName: 'Иванов Иван',
            doctorId: 'doctor_id_example',
            appointmentTime: '2025-03-17T10:00:00',
        };

        createXmlForAppointment(appointment);

    } catch (error) {
        console.error('Ошибка при обработке:', error);
    } finally {
        db.end();
    }
}

main();
