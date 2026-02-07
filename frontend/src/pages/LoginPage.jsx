import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await login(email, password);
        if (!res.success) {
            setError(res.message);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-white font-sans">
            <div className="w-full max-w-lg px-4">

                {/* Title */}
                <h1 className="text-4xl font-bold text-black mb-6 text-left pl-2">Login</h1>

                <form onSubmit={handleSubmit}>
                    {/* Gray Card for Inputs */}
                    <div className="bg-[#F3F4F6] rounded-3xl p-10 shadow-sm mb-8">

                        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}

                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 pl-1">Email Id</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-3 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#664275] shadow-sm bg-white"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 pl-1">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-3 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#664275] shadow-sm bg-white"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Create Account Link */}
                    <div className="text-center mb-6">
                        <Link to="/signup" className="text-gray-500 font-medium hover:text-[#664275] transition">
                            Create a new account
                        </Link>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full sm:w-2/3 mx-auto block bg-[#664275] text-white py-3 rounded-md font-bold text-lg hover:opacity-90 transition shadow-md"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
