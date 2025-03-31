const axios = require('axios');
const sberHealthConfig = require('../config/sberHealthConfig');
const { getOccupiedSlots } = require('../models/slotModel');
const moment = require('moment');

const SLOT_DURATION = 40;  // minutes
const START_TIME = moment('09:00:00', 'HH:mm:ss');
const END_TIME = moment('18:00:00', 'HH:mm:ss');
const DAYS_AHEAD = 14;

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

exports.updateScheduleInSber = async (availableSlots) => {
    const params = {
        id: '01GK3E9NX9KNVZG6W30NR9GD9S',
        jsonrpc: '2.0',
        method: 'updateSchedule',
        params: {
            resourceExternal: `${sberHealthConfig.prefix}_1#42`,
            schedule: availableSlots,
            removeMissingDates: true
        }
    };

    try {
        const response = await axios.post(sberHealthConfig.baseUrl, params, {
            headers: { Authorization: `Bearer ${sberHealthConfig.apiKey}` },
        });
        console.log('Schedule updated:', response.data);
    } catch (error) {
        console.error('Error in updateScheduleInSber:', error);
    }
};

exports.getAvailableSlots = async () => {
    try {
        const occupiedSlots = await getOccupiedSlots();
        let availableSlots = [];

        let currentDate = moment();
        let currentTime = START_TIME.clone();

        for (let dayOffset = 0; dayOffset < DAYS_AHEAD; dayOffset++) {
            currentTime = START_TIME.clone().add(dayOffset, 'days');

            while (currentTime.isBefore(END_TIME)) {
                let slotEndTime = currentTime.clone().add(SLOT_DURATION, 'minutes');

                let isOccupied = occupiedSlots.some(slot => {
                    const startTime = moment(slot.startTime, 'YYYY-MM-DD HH:mm:ss');
                    const endTime = moment(slot.endTime, 'YYYY-MM-DD HH:mm:ss');

                    return (
                        (currentTime.isBetween(startTime, endTime, null, '[)')) ||
                        (slotEndTime.isBetween(startTime, endTime, null, '[)')) ||
                        (currentTime.isBefore(startTime) && slotEndTime.isAfter(endTime))
                    );
                });

                if (!isOccupied) {
                    availableSlots.push({
                        from: currentTime.format('YYYY-MM-DDTHH:mm:ss'),
                        to: slotEndTime.format('YYYY-MM-DDTHH:mm:ss'),
                        active: true
                    });
                }

                currentTime = slotEndTime;
            }
        }

        return availableSlots;
    } catch (error) {
        console.error('Error in getAvailableSlots:', error);
        throw error;
    }
};
