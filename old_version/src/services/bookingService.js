const axios = require('axios');
const sberHealthConfig = require('../config/sberHealthConfig');

exports.sendBookingToSber = async (xmlData) => {
    const params = {
        id: '01GK3E9NX9KNVZG6W30NR9GD9S',
        jsonrpc: '2.0',
        method: 'book',
        params: [
            {
                patientId: '12345', // Пример
                employee: { fullName: 'Кольчев-Вейсалов Валерий-Янис Намигович' },
                procedure: 'ОБЕД',
                startTime: '2025-01-02T14:20:00',
                endTime: '2025-01-02T15:00:00',
                paymentMethod: 'Прогноз',
                status: 'NEW',
            }
        ]
    };

    await axios.post(sberHealthConfig.baseUrl, params, {
        headers: { Authorization: `Bearer ${sberHealthConfig.apiKey}` },
    });
};
