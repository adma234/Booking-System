import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const SelectedSlotsPage = () => {
    const [slots, setSlots] = useState([]);
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const res = await api.get('/slots');
                setSlots(res.data.data);
            } catch (error) {
                console.error("Error fetching slots", error);
            }
        };
        fetchSlots();
    }, []);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/slots/${id}`);
            setSlots(prev => prev.filter(s => s._id !== id));
        } catch (error) {
            console.error("Failed to delete slot", error);
        }
    }

    const handleAddNew = () => {
        navigate('/calendar');
    };

    // Group slots by Month Year
    const groupedSlots = slots.reduce((acc, slot) => {
        const date = new Date(slot.date);
        const key = date.toLocaleString('default', { month: 'long', year: 'numeric' });
        if (!acc[key]) acc[key] = [];
        acc[key].push(slot);
        return acc;
    }, {});

    // Sort groups by date (approximated by parsing key or using first slot)
    const sortedKeys = Object.keys(groupedSlots).sort((a, b) => {
        return new Date(groupedSlots[a][0].date) - new Date(groupedSlots[b][0].date);
    });

    return (
        <div className="min-h-screen bg-white p-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-16">
                    <h1 className="text-4xl font-bold text-black">Scheduled Classes</h1>
                    <div className="flex gap-4 items-center">
                        <button
                            onClick={logout}
                            className="text-gray-500 hover:text-red-500 font-bold transition mr-4"
                        >
                            Logout
                        </button>
                        <button
                            onClick={handleAddNew}
                            className="bg-[#664275] text-white px-8 py-3 rounded shadow hover:bg-[#523360] font-bold transition"
                        >
                            Add New Slot
                        </button>
                    </div>
                </div>

                {/* Grouped Rows */}
                {sortedKeys.map(key => (
                    <div key={key} className="flex flex-col md:flex-row mb-12">
                        {/* Left: Month Year Label */}
                        <div className="w-full md:w-48 flex-shrink-0 mb-4 md:mb-0">
                            <div className="text-2xl font-medium text-black leading-tight">
                                {key.split(' ')[0]} <br />
                                {key.split(' ')[1]}
                            </div>
                        </div>

                        {/* Right: Grid of Slots */}
                        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                            {groupedSlots[key].map((slot) => (
                                <div key={slot._id} className="flex flex-col">
                                    {/* Card */}
                                    <div className="bg-[#E2DAFF] h-32 p-3 flex flex-col justify-between relative mb-2 transition hover:opacity-90">
                                        {/* Top Left Info */}
                                        <div className="flex flex-col items-start leading-tight">
                                            <span className="text-sm font-bold text-[#664275]">
                                                Day {slot.dayNumber}
                                            </span>
                                            <span className="text-[10px] text-gray-500 font-medium">
                                                {slot.topicName}
                                            </span>
                                        </div>

                                        {/* Bottom Right Date */}
                                        <div className="self-end text-lg font-bold text-black">
                                            {new Date(slot.date).getDate() < 10 ? `0${new Date(slot.date).getDate()}` : new Date(slot.date).getDate()}
                                        </div>
                                    </div>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDelete(slot._id)}
                                        className="w-full border border-gray-400 rounded py-1 text-xs font-bold text-black hover:bg-gray-50 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {slots.length === 0 && (
                    <div className="text-center py-20 text-gray-400 text-xl font-light">
                        No scheduled classes found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectedSlotsPage;
