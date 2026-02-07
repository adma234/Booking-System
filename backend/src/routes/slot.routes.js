const express = require('express');
const { getSlots, addSlot, deleteSlot, updateSlots } = require('../controllers/slot.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(protect); // All routes are protected

router.route('/')
    .get(getSlots)
    .post(addSlot)
    .put(updateSlots);

router.delete('/:id', deleteSlot);

module.exports = router;
