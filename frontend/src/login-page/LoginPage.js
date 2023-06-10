import React, {useState} from 'react';
import './LoginPage.css';
import Axios from "axios";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [cookies, setCookie] = useCookies(['user', 'token']);
    const navigate = useNavigate()
    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        setEmailError(validateEmail(value));
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);
        setPasswordError(validatePassword(value));
    };

    const handleLogin = (event) => {
        event.preventDefault();
        if (!emailError && !passwordError) {
            Axios.post("http://localhost:5000/api/login", {email, password}).then(
                response => {
                    setCookie('user', response.data.user, {path: '/'});
                    setCookie('token', response.data.token, {path: '/'});
                    navigate("/")
                }
            )
        }
    };

    const validateEmail = (value) => {
        const emailPattern = /\S+@\S+\.\S+/;
        return value && !emailPattern.test(value) ? 'Invalid email address' : '';
    };

    const validatePassword = (value) => {
        return value && value.length < 8 ? 'Password should be at least 8 characters long' : '';
    };

    return (
        <div className="login-container">
            <div className="card">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <div className={`input-line ${emailError ? 'invalid' : 'valid'}`}/>
                    </div>
                    {emailError && <p className="error-message">{emailError}</p>}
                    <div className="input-container">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <div className={`input-line ${passwordError ? 'invalid' : 'valid'}`}/>
                    </div>
                    {passwordError && <p className="error-message">{passwordError}</p>}
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
