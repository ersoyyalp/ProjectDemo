import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../../App.css';

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        password: ''
    });

    const navigate = useNavigate(); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        };

        fetch('https://localhost:7255/api/auth/register', requestOptions)
            .then(async (res) => {
                if (res.ok && res.status === 200) {
                    window.alert('Registration completed successfully.');

                    navigate('/login');
                } else {
                    const errorData = await res.json();
                    window.alert(`Registration failed: ${errorData.message}`);
                }
            })
            .catch(err => {
                console.error(err);
                window.alert('This user already exists.');
            });
    };

    return (
        <div className="text-center m-5-auto">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>Username</label><br />
                    <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleInputChange}
                        required
                    />
                </p>
                <p>
                    <label>Email address</label><br />
                    <input
                        type="email"
                        name="userEmail"
                        value={formData.userEmail}
                        onChange={handleInputChange}
                        required
                    />
                </p>
                <p>
                    <label>Password</label><br />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </p>
                <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                </p>
                <p>
                    <button id="sub_btn" type="submit">Register</button>
                </p>
            </form>
            <footer>
                <p><Link to="/login">Do you have an account?</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    );
}
