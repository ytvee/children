const xml2js = require('xml2js');

exports.createXmlRecord = (record) => {
    const builder = new xml2js.Builder();
    const xml = builder.buildObject({
        appointment: {
            period: record.period,
            employee: { fullName: record.employee.fullName },
            procedure: { name: record.procedure.name },
            patient: { fullName: record.patient.fullName },
            startTime: record.startTime,
            endTime: record.endTime,
            commentary: record.commentary || '',
            confirmed: record.confirmed,
            completed: record.completed,
            missed: record.missed,
            paid: record.paid,
            paymentMethod: record.paymentMethod,
            notificationSent: record.notificationSent,
            juridicalPerson: record.juridicalPerson,
            creator: { fullName: record.creator.fullName },
            createdAt: record.createdAt,
            appointmentNumber: record.appointmentNumber
        }
    });
    return xml;
};
