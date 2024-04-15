const express = require('express');
const router = express.Router();
const { getAllSport, createSport, updateSport ,deleteSport} = require('../controller/controllerSport.js');

router.get('/sport/all', getAllSport);
router.post('/sport/create', createSport);
router.put('/sport/update/:id', updateSport);
router.delete('/sport/delete/:id', deleteSport);

module.exports = router;