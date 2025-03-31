const slotService = require('../services/slotService');

// Get slots for doctor
exports.getSlots = async (req, res) => {
    try {
        const slots = await slotService.getSlots();
        res.json(slots);
    } catch (error) {
        res.status(500).json({ error: 'Error in slotController: getSlots' });
    }
};

// Update slots
exports.updateSlots = async (req, res) => {
    try {
        const slots = req.body.slots;
        await slotService.updateSchedule(slots);
        res.status(200).json({ message: 'Schedule successfully updated' });
    } catch (error) {
        res.status(500).json({ error: 'Error in slotController: updateSlots' });
    }
};
