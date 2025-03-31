const xmlService = require('../services/xmlService');

exports.generateXml = (req, res) => {
    const bookingData = req.body;
    const xml = xmlService.createXmlRecord(bookingData);
    res.set('Content-Type', 'application/xml');
    res.send(xml);
};
