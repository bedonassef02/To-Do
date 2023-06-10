import React, {useState} from 'react';
import './RegisterPage.css';
import Axios from "axios";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [cookies, setCookie] = useCookies(['user', 'token']);
    const navigate = useNavigate()

    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setUsername(value);
        setUsernameError(validateUsername(value));
    };

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

    const handleRegister = (event) => {
        event.preventDefault();
        if (!usernameError && !emailError && !passwordError) {
            Axios.post("http://localhost:5000/api/register", {username, email, password}).then(
                response => {
                    setCookie('user', response.data.user, {path: '/'});
                    setCookie('token', response.data.token, {path: '/'});
                    navigate("/")
                }
            )
        }
    };

    const validateUsername = (value) => {
        return value && value.length < 3 ? 'Username should be at least 3 characters long' : '';
    };

    const validateEmail = (value) => {
        const emailPattern = /\S+@\S+\.\S+/;
        return value && !emailPattern.test(value) ? 'Invalid email address' : '';
    };

    const validatePassword = (value) => {
        return value && value.length < 8 ? 'Password should be at least 8 characters long' : '';
    };

    return (
        <div className="register-container">
            <div className="card">
                <h1>Register</h1>
                <form onSubmit={handleRegister}>
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <div className={`input-line ${usernameError ? 'invalid' : 'valid'}`}/>
                    </div>
                    {usernameError && <p className="error-message">{usernameError}</p>}
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
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
