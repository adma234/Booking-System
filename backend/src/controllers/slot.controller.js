const mongoose = require('mongoose');
const Slot = require('../models/Slot');

const getSlots = async (req, res) => {
    try {
        const slots = await Slot.find({ userId: req.user.id }).sort({ date: 1 });
        res.json({ success: true, data: slots });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const addSlot = async (req, res) => {
    try {
        const { date, batchNumber, dayNumber, topicName, month, year } = req.body;

        const slot = await Slot.create({
            userId: req.user.id,
            date,
            batchNumber,
            dayNumber,
            topicName,
            month,
            year
        });

        res.status(201).json({ success: true, data: slot });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'Slot already booked for this date' });
        }
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error: ' + error.message });
    }
};

const deleteSlot = async (req, res) => {
    try {
        const slot = await Slot.findById(req.params.id);

        if (!slot) {
            return res.status(404).json({ success: false, message: 'Slot not found' });
        }

        // Ensure ownership
        if (slot.userId.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        await slot.deleteOne();

        res.json({ success: true, id: req.params.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const updateSlots = async (req, res) => {
    try {
        const { slots } = req.body; // Array of slots

        // 1. Delete all existing slots for this user
        // Note: Without transactions (Replica Set required), there is a small risk if step 2 fails.
        // But this is required for standalone MongoDB instances.
        await Slot.deleteMany({ userId: req.user.id });

        // 2. Bulk insert if any
        if (slots && slots.length > 0) {
            const slotsToInsert = slots.map(s => ({
                userId: req.user.id,
                date: s.date,
                batchNumber: s.batchNumber,
                dayNumber: s.dayNumber,
                topicName: s.topicName,
                month: s.month,
                year: s.year
            }));
            await Slot.insertMany(slotsToInsert);
        }

        // Fetch and return the updated state
        const newSlots = await Slot.find({ userId: req.user.id }).sort({ date: 1 });
        res.json({ success: true, data: newSlots });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'Duplicate slots detected in payload' });
        }
        console.error("Bulk update failed:", error);
        res.status(500).json({ success: false, message: 'Server error during bulk update' });
    }
}

module.exports = { getSlots, addSlot, deleteSlot, updateSlots };
