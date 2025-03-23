const express = require('express');
const cronJobs = require('./src/utils/cronJobs');
const slotController = require('./src/controllers/slotController');
const bookingController = require('./src/controllers/bookingController');
const xmlController = require('./src/controllers/xmlController');

const app = express();
app.use(express.json());

app.get('/slots', slotController.getSlots);
app.post('/update-slots', slotController.updateSlots);
app.post('/create-booking', bookingController.createBooking);
app.post('/generate-xml', xmlController.generateXml);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`);
});
