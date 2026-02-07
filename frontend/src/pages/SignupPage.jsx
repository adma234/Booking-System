import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '+91',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const { signup } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const payload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: `${formData.countryCode} ${formData.phoneNumber}`,
            password: formData.password
        };

        const res = await signup(payload);
        if (res.success) {
            navigate('/login');
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-5xl">

                {/* Title */}
                <h1 className="text-4xl font-bold text-black mb-8 text-left">Sign Up</h1>

                <form onSubmit={handleSubmit}>
                    {/* Gray Card */}
                    <div className="bg-[#F3F4F6] rounded-3xl p-8 lg:p-12 shadow-sm mb-8">

                        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-6 text-sm">{error}</div>}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                            {/* Row 1 */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 pl-1">First Name</label>
                                <input
                                    type="text" name="firstName" required
                                    className="w-full px-4 py-3 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#664275] shadow-sm bg-white"
                                    value={formData.firstName} onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 pl-1">Last Name</label>
                                <input
                                    type="text" name="lastName" required
                                    className="w-full px-4 py-3 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#664275] shadow-sm bg-white"
                                    value={formData.lastName} onChange={handleChange}
                                />
                            </div>

                            {/* Row 2 */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 pl-1">Email Id</label>
                                <input
                                    type="email" name="email" required
                                    className="w-full px-4 py-3 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#664275] shadow-sm bg-white"
                                    value={formData.email} onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 pl-1">Contact Number</label>
                                <div className="flex gap-4">
                                    <select
                                        name="countryCode"
                                        className="w-24 px-2 py-3 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#664275] shadow-sm bg-white font-medium text-center"
                                        value={formData.countryCode} onChange={handleChange}
                                    >
                                        <option value="+91">+91</option>
                                        <option value="+1">+1</option>
                                        <option value="+44">+44</option>
                                    </select>
                                    <input
                                        type="tel" name="phoneNumber" required
                                        className="flex-1 px-4 py-3 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#664275] shadow-sm bg-white"
                                        value={formData.phoneNumber} onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Row 3 */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 pl-1">Password</label>
                                <input
                                    type="password" name="password" required
                                    className="w-full px-4 py-3 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#664275] shadow-sm bg-white"
                                    value={formData.password} onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 pl-1">Confirm Password</label>
                                <input
                                    type="password" name="confirmPassword" required
                                    className="w-full px-4 py-3 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#664275] shadow-sm bg-white"
                                    value={formData.confirmPassword} onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer Section */}
                    <div className="flex flex-col items-center">
                        <div className="text-gray-500 font-medium mb-6">
                            Already have an Account? <Link to="/login" className="text-gray-700 font-bold hover:underline">Login</Link>
                        </div>

                        <button
                            type="submit"
                            className="w-64 bg-[#664275] text-white py-3 rounded-none font-bold text-lg hover:opacity-90 transition shadow-md"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
