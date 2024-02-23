import { useState } from 'react';
import Cookies from "js-cookie"



import './index.css';

const LoginComponent= (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMessage] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const registerUser = async (event) => {
        event.preventDefault();
        const data = {
            username,
            password,
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(data)
        };

        const url = "http://localhost:8000/voltuswave/login";
        try {
            const response = await fetch(url, options);
            const responseData = await response.json();
           
            if (responseData.ok) {
                setUsername("");
                setPassword("");
                setErrorMessage("Login successfully");
                const token=responseData.jwtToken
                Cookies.set('jwt_token',token,{expires:5})
            } else {
                setErrorMessage(responseData.message || "Failed to login user");
            }
        } catch (error) {
            console.error("Error occurred during login:", error);
            setErrorMessage("Error occurred during login");
        }
    };

    return (
        <div className='background-container'>
            <h1 className='company-name'><span style={{ "color": "#e83a05" }}>VOLTUS</span>WAVE</h1>
            <form className='form-card' onSubmit={registerUser}>
                <div className='flex-container'>
                    <label htmlFor='username' className='label'>Username <span style={{ "color": "red" }}>*</span></label>
                    <input placeholder='Enter Username' className='input' onChange={handleUsernameChange} type='text' id="username" required value={username} />
                </div>
            
                <div className='flex-container'>
                    <label htmlFor='password' className='label'>Password<span style={{ "color": "red" }}>*</span></label>
                    <input placeholder='Enter Password' className='input' onChange={handlePasswordChange} type='password' id="password" required value={password} />
                </div>
                <button className='register-btn' style={{"color":"#0ffffff"}} type='submit'>Login</button>
                {errorMsg && <p className='errMsg'>{errorMsg}</p>}
            </form>
            <button className='register-btn' type='submit' onClick={()=>props.updateIsclicked()}>Register</button>
        </div>
    );
};

export default LoginComponent;
