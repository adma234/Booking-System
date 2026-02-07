const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        required: [true, 'Date is required'],
    },
    batchNumber: {
        type: Number,
        required: [true, 'Batch number is required'],
        min: [1, 'Batch number must be at least 1'],
        max: [3, 'Batch number must be at most 3'],
    },
    dayNumber: {
        type: Number,
        required: [true, 'Day number is required'],
        min: [1, 'Day number must be at least 1'],
        max: [7, 'Day number must be at most 7'],
    },
    topicName: {
        type: String,
        required: [true, 'Topic name is required'],
    },
    month: {
        type: Number,
        required: true,
        min: 1,
        max: 12,
    },
    year: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

// Compound unique index to prevent double booking for the same user on the same date
slotSchema.index({ userId: 1, date: 1 }, { unique: true });

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
