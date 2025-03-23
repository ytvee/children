const cron = require('node-cron');
const slotService = require('../services/slotService');

cron.schedule('*/1 * * * *', async () => {
    console.log('Slots updating...');
    const slots = await slotService.getSlots();
    if (slots) {
        await slotService.updateSchedule(slots);
    }
});
