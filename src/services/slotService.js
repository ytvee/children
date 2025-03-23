const axios = require('axios');
const sberHealthConfig = require('../../config/sberHealthConfig');

exports.getSlots = async () => {
    const params = {
        id: '01GK3E9NX9KNVZG6W30NR9GD9S',
        jsonrpc: '2.0',
        method: 'getSlots',
        params: {
            resources: [`${sberHealthConfig.prefix}_1#42`],
            active: true,
            useExternal: true,
            from: '2022-12-07 11:00',
            to: '2022-12-10 12:00'
        }
    };

    const response = await axios.post(sberHealthConfig.baseUrl, params, {
        headers: { Authorization: `Bearer ${sberHealthConfig.apiKey}` },
    });
    return response.data.result;
};

exports.updateSchedule = async (slots) => {
    const params = {
        id: '01GK3E9NX9KNVZG6W30NR9GD9S',
        jsonrpc: '2.0',
        method: 'updateSchedule',
        params: {
            resourceExternal: `${sberHealthConfig.prefix}_1#42`,
            schedule: slots,
            removeMissingDates: true
        }
    };

    await axios.post(sberHealthConfig.baseUrl, params, {
        headers: { Authorization: `Bearer ${sberHealthConfig.apiKey}` },
    });
};
