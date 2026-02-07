import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectedSlotsModal from '../components/SelectedSlotsModal';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { FaChevronLeft, FaChevronRight, FaInstagram, FaFacebookF, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const CalendarPage = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [existingSlots, setExistingSlots] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Helper to get days in month
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = async () => {
        try {
            const res = await api.get('/slots');
            const slots = res.data.data;
            setExistingSlots(slots);
            setSelectedSlots(slots);

            if (slots.length > 0) {
                // Find the earliest date to set the calendar view
                const sortedSlots = [...slots].sort((a, b) => new Date(a.date) - new Date(b.date));
                setCurrentDate(new Date(sortedSlots[0].date));
            }
        } catch (error) {
            console.error("Failed to fetch slots", error);
        }
    };

    const handleDateClick = (day) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const dayOfWeek = date.getDay(); // 0 = Sun
        if (dayOfWeek === 0) return;

        const isExisting = selectedSlots.some(slot =>
            new Date(slot.date).toDateString() === date.toDateString()
        );

        if (isExisting) {
            setSelectedSlots(prev => prev.filter(slot =>
                new Date(slot.date).toDateString() !== date.toDateString()
            ));
        } else {
            const newSlot = {
                date: date.toISOString(),
                dayNumber: dayOfWeek,
                topicName: `Topic ${dayOfWeek}`,
                batchNumber: 1,
                month: currentDate.getMonth() + 1,
                year: currentDate.getFullYear()
            };
            setSelectedSlots(prev => [...prev, newSlot]);
        }
    };

    const handleSubmit = () => {
        setIsModalOpen(true);
    };

    const handleModalConfirm = async () => {
        try {
            await api.put('/slots', { slots: selectedSlots });
            setIsModalOpen(false);
            navigate('/selected-slots');
        } catch (error) {
            console.error("Failed to save slots", error);
            alert("Failed to save: " + error.response?.data?.message);
        }
    };

    const handleModalDelete = (slotToDelete) => {
        setSelectedSlots(prev => prev.filter(slot =>
            new Date(slot.date).toDateString() !== new Date(slotToDelete.date).toDateString()
        ));
    };

    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
    const days = [];

    // Empty cells
    for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="h-28 bg-gray-50/50"></div>);
    }

    // Days
    for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), d);
        const dayOfWeek = date.getDay();
        const isDisabled = dayOfWeek === 0;

        const isSelected = selectedSlots.some(slot =>
            new Date(slot.date).toDateString() === date.toDateString()
        );

        let bgClass = "bg-gray-50";
        if (isDisabled) bgClass = "bg-gray-50 cursor-default opacity-50";
        else if (isSelected) bgClass = "bg-[#664275] text-white";
        else bgClass = "bg-[#E2DAFF] hover:opacity-90 cursor-pointer";

        // Day Number formatting (01, 02...)
        const formattedDay = d < 10 ? `0${d}` : d;

        days.push(
            <div
                key={d}
                onClick={() => !isDisabled && handleDateClick(d)}
                className={`h-28 p-3 flex flex-col justify-between relative transition-all duration-200 ${bgClass}`}
            >
                {/* Top Left: Topic Info */}
                {!isDisabled && (
                    <div className="flex flex-col items-start leading-tight">
                        <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-[#664275]'}`}>
                            Day {dayOfWeek}
                        </span>
                        <span className={`text-xs ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                            Topic {dayOfWeek}
                        </span>
                    </div>
                )}

                {/* Bottom Right: Date Number */}
                <div className={`self-end text-lg font-medium ${isSelected ? 'text-white' : 'text-gray-600'}`}>
                    {formattedDay}
                </div>
            </div>
        );
    }

    const topics = [
        { day: 'Day 1', topic: 'Topic 1' },
        { day: 'Day 2', topic: 'Topic 2' },
        { day: 'Day 3', topic: 'Topic 3' },
        { day: 'Day 4', topic: 'Topic 4' },
        { day: 'Day 5', topic: 'Topic 5' },
        { day: 'Day 6', topic: 'Topic 6' },
        { day: 'Day 7', topic: 'Topic 7' },
    ];

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return (
        <div className="flex h-screen bg-white font-sans overflow-hidden">
            {/* Main Calendar Area (Left) */}
            <div className="flex-1 flex flex-col p-8 overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-black">Select your slots</h1>
                    <button onClick={logout} className="text-gray-500 hover:text-red-500 font-semibold transition-colors">
                        Logout
                    </button>
                </div>

                {/* Legend */}
                <div className="flex gap-6 mb-6 text-sm font-medium">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-[#664275] rounded border border-gray-300"></div>
                        <span className="text-gray-700">Selected Slots</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-[#E2DAFF] rounded border border-gray-300"></div>
                        <span className="text-gray-700">Selectable Slots</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-white rounded border border-gray-300"></div>
                        <span className="text-gray-700">Non-Selectable Dates</span>
                    </div>
                </div>

                {/* Calendar Grid Header */}
                <div className="grid grid-cols-7 gap-4 mb-4 text-[#bfbfbf] font-medium text-sm">
                    <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
                </div>

                {/* Calendar Grid Body */}
                <div className="grid grid-cols-7 gap-4">
                    {(() => {
                        const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
                        const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
                        const days = [];

                        // Empty cells for previous month
                        for (let i = 0; i < firstDay; i++) {
                            days.push(<div key={`empty-${i}`} className="h-28 bg-gray-50/50"></div>);
                        }

                        // Calculate valid batch dates
                        // Rules:
                        // 1. Start from 1st
                        // 2. 3 Batches total
                        // 3. Each batch = 7 days
                        // 4. No Sundays
                        // 5. Gap = 2 working days (non-Sundays) between batches
                        const validDates = new Set();
                        let currentDay = 1;
                        let batchCount = 0;

                        while (batchCount < 3 && currentDay <= daysInMonth) {
                            // Find days for current batch
                            let daysAdded = 0;
                            while (daysAdded < 7 && currentDay <= daysInMonth) {
                                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDay);
                                if (date.getDay() !== 0) { // Not Sunday
                                    validDates.add(currentDay);
                                    daysAdded++;
                                }
                                currentDay++;
                            }
                            batchCount++;

                            // Add gap if not last batch
                            if (batchCount < 3) {
                                let gapDays = 0;
                                while (gapDays < 2 && currentDay <= daysInMonth) {
                                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDay);
                                    if (date.getDay() !== 0) { // Gap consumes working days only
                                        gapDays++;
                                    }
                                    currentDay++;
                                }
                            }
                        }

                        // Render days
                        for (let d = 1; d <= daysInMonth; d++) {
                            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), d);
                            const dayOfWeek = date.getDay();
                            const isSunday = dayOfWeek === 0;

                            const isSelected = selectedSlots.some(slot =>
                                new Date(slot.date).toDateString() === date.toDateString()
                            );

                            const isValidBatchDate = validDates.has(d);
                            const isSelectable = !isSunday && isValidBatchDate;

                            let bgClass = "bg-white border border-gray-100"; // Default Non-Selectable
                            if (isSelected) bgClass = "bg-[#664275] text-white shadow-md border-transparent";
                            else if (isSelectable) bgClass = "bg-[#E2DAFF] hover:opacity-90 cursor-pointer border-transparent text-gray-800";
                            else bgClass = "bg-white text-gray-300 cursor-not-allowed border border-gray-100"; // Explicit non-selectable style

                            const formattedDay = d < 10 ? `0${d}` : d;

                            days.push(
                                <div
                                    key={d}
                                    onClick={() => isSelectable && handleDateClick(d)}
                                    className={`h-28 p-3 flex flex-col justify-between relative transition-all duration-200 rounded-lg ${bgClass}`}
                                >
                                    {/* Top Left: Topic Info (Only for selectable days) */}
                                    {isSelectable && (
                                        <div className="flex flex-col items-start leading-tight">
                                            <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-[#664275]'}`}>
                                                Day {dayOfWeek}
                                            </span>
                                            <span className={`text-xs ${isSelected ? 'text-gray-300' : 'text-gray-600'}`}>
                                                Topic {dayOfWeek}
                                            </span>
                                        </div>
                                    )}

                                    {/* Bottom Right: Date Number */}
                                    <div className={`self-end text-lg font-medium ${isSelected ? 'text-white' : (isSelectable ? 'text-gray-700' : 'text-gray-300')}`}>
                                        {formattedDay}
                                    </div>
                                </div>
                            );
                        }
                        return days;
                    })()}
                </div>
            </div>

            {/* Right Info Panel */}
            <div className="w-[400px] bg-white p-8 flex flex-col shadow-[-5px_0_15px_-5px_rgba(0,0,0,0.05)] z-10">
                <div className="flex flex-col items-end mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2 w-full text-right">Monthly Schedule</h2>
                    <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-lg">
                        <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))} className="hover:text-[#664275]">
                            <FaChevronLeft size={12} />
                        </button>
                        <span className="text-[#664275] font-semibold text-lg min-w-[120px] text-center">
                            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </span>
                        <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))} className="hover:text-[#664275]">
                            <FaChevronRight size={12} />
                        </button>
                    </div>
                </div>

                {/* Time Info */}
                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between text-sm font-semibold text-gray-700 mb-8 border border-gray-100">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">🕒</span> 09:00 hs
                    </div>
                    <div className="h-6 w-px bg-gray-300 mx-2"></div>
                    <div>06:00 hs</div>
                </div>

                {/* Topic List */}
                <div className="flex-1 overflow-y-auto mb-6 pr-2">
                    <ul className="space-y-4">
                        {topics.map((t, i) => (
                            <li key={i} className="flex gap-4 text-base">
                                <span className="font-bold text-gray-700 w-16">{t.day}:</span>
                                <span className="text-gray-500">{t.topic}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    disabled={selectedSlots.length === 0}
                    className="w-full bg-[#664275] text-white py-4 rounded-md font-bold text-lg hover:bg-[#533560] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-8"
                >
                    Submit
                </button>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-gray-600 mt-auto">
                    <div className="flex gap-3 text-gray-800 text-lg">
                        <FaInstagram className="cursor-pointer hover:text-[#664275]" />
                        <FaFacebookF className="cursor-pointer hover:text-[#664275]" />
                        <FaTwitter className="cursor-pointer hover:text-[#664275]" />
                        <FaWhatsapp className="cursor-pointer hover:text-[#664275]" />
                    </div>
                    <div className="font-medium">
                        For inquiry : +44 123456789
                    </div>
                </div>
            </div>

            {/* Vertical Month Strip (Far Right) */}
            <div className="w-12 bg-gray-100 border-l border-gray-200 flex flex-col items-center py-4 text-xs font-semibold text-gray-400 overflow-y-auto hidden md:flex scrollbar-hide">
                {months.map((m, i) => {
                    const isCurrent = i === currentDate.getMonth();
                    return (
                        <div
                            key={i}
                            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), i, 1))}
                            className={`py-4 w-full text-center cursor-pointer transition-colors ${isCurrent ? 'bg-white text-black font-bold shadow-sm' : 'hover:bg-gray-200'}`}
                        >
                            <span className={isCurrent ? 'transform rotate-90 block' : 'transform rotate-90 block'}>{m}</span>
                        </div>
                    )
                })}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <SelectedSlotsModal
                    slots={selectedSlots}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleModalConfirm}
                    onDelete={handleModalDelete}
                />
            )}
        </div>
    );
};

export default CalendarPage;
