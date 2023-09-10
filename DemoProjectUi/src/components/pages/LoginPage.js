import React ,{ useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import '../../App.css'

export default function SignInPage() {
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

        fetch('https://localhost:7255/api/auth/login', requestOptions)
            .then(res => {
                if (res.ok && res.status === 200) {
                    window.alert('Login success.');;
                    navigate('/home');
                    
                } else {
                    return window.alert('Login failed. Username and password are incorrect.');
                }
            })
            .catch(err => {
                console.log(err);
                window.alert('Something went wrong.');
            });
    };
    return (
        <div className="text-center m-5-auto">
            <h2>Sign in to us</h2>
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
                    <label>Password</label>
                    <br />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </p>
                <p>
                    <button id="sub_btn" type="submit">Login</button>
                </p>
            </form>
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    );
}
