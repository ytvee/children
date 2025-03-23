const xmlService = require('../services/xmlService');
const bookingService = require('../services/bookingService');

// booking
exports.createBooking = async (req, res) => {
    try {
        const bookingData = req.body;
        const xmlData = xmlService.createXmlRecord(bookingData);
        await bookingService.sendBookingToSber(xmlData);
        res.status(200).json({ message: 'Item sent to Sber' });
    } catch (error) {
        res.status(500).json({ error: 'Error in booking controller' });
    }
};
