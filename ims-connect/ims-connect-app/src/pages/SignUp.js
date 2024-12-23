import React, { useState } from 'react';
import axios from 'axios';
import Notification from './Notification'; 
import './SignUp.css';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        email: '',
        contact: '',
        username: '',
        password: '',
    });
    const [notification, setNotification] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/signup', formData);
            setNotification('User registered successfully!');
            setTimeout(() => setNotification(''), 3000); 

            setFormData({
                name: '',
                dob: '',
                email: '',
                contact: '',
                username: '',
                password: '',
            });
        } catch (err) {
            setNotification('Error signing up');
            setTimeout(() => setNotification(''), 3000); 
        }
    };

    return (
        <div className="signup-page">
            <Notification message={notification} />
            <h1>Sign Up</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="contact"
                    placeholder="Contact Number"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
