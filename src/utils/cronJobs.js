const cron = require('node-cron');
const slotService = require('../services/slotService');

cron.schedule('*/1 * * * *', async () => {
    console.log('Slots updating...');
    try {
        const availableSlots = await slotService.getAvailableSlots();
        if (availableSlots.length > 0) {
            await slotService.updateScheduleInSber(availableSlots);
        } else {
            console.log('There are not empty slots');
        }
    } catch (error) {
        console.error('Error in cron.schedule:', error);
    }
});
