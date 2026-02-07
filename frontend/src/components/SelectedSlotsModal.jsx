import React from 'react';
import { FaTimes } from 'react-icons/fa';

const SelectedSlotsModal = ({ slots, onClose, onConfirm, onDelete }) => {
    // Sort slots by date
    const sortedSlots = [...slots].sort((a, b) => new Date(a.date) - new Date(b.date));

    const getOrdinal = (n) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 w-full max-w-6xl shadow-2xl relative">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 bg-gray-400 text-white rounded-full p-2 hover:bg-gray-500 shadow-lg"
                >
                    <FaTimes size={16} />
                </button>

                <h2 className="text-3xl font-bold text-center mb-10 text-black">Selected Slots</h2>

                {/* Horizontal Scroll Component */}
                <div className="flex gap-6 overflow-x-auto pb-8 justify-center min-h-[220px]">
                    {sortedSlots.map((slot, index) => (
                        <div key={index} className="flex flex-col items-center">
                            {/* Schedule Label */}
                            <div className="self-start text-xs font-bold text-black mb-2 pl-1">
                                {getOrdinal(index + 1)} Schedule
                            </div>

                            {/* Card Info */}
                            <div className="w-32 h-24 bg-[#664275] rounded-lg p-3 flex items-center justify-between shadow-lg text-white mb-3">
                                <div className="text-3xl font-bold">
                                    {new Date(slot.date).getDate() < 10 ? `0${new Date(slot.date).getDate()}` : new Date(slot.date).getDate()}
                                </div>
                                <div className="flex flex-col text-[10px] items-end leading-tight">
                                    <span className="font-semibold">Day {slot.dayNumber}</span>
                                    <span className="opacity-80 font-light">{slot.topicName}</span>
                                </div>
                            </div>

                            {/* Delete Button */}
                            <button
                                onClick={() => onDelete(slot)}
                                className="w-full bg-white border border-gray-300 rounded py-1 text-xs font-bold text-black hover:bg-gray-50 shadow-sm transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    ))}

                    {sortedSlots.length === 0 && (
                        <div className="text-gray-400 italic w-full text-center py-8">No slots selected</div>
                    )}
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-center gap-6 mt-4">
                    <button
                        onClick={onClose}
                        className="px-10 py-3 bg-gray-300 text-black font-bold rounded shadow hover:bg-gray-400 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-12 py-3 bg-[#664275] text-white font-bold rounded shadow hover:bg-[#523360] transition"
                    >
                        Ok
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SelectedSlotsModal;
