import { useState } from 'react';
import LoginComponent from "../LoginComponent/login"


import "./index.css"


const RegistrationComponent = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMessage] = useState("");
    const [isClicked,setIsClicked]=useState(true)

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const registerUser = async (event) => {
        event.preventDefault();
        const data = {
            username,
            email,
            password,
        };

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(data)
        };

        const url = "http://localhost:8000/voltuswave/create-user";
        try {
            const response = await fetch(url, options);
            const responseData = await response.json();
            if (response.ok) {
                setUsername("");
                setEmail("");
                setPassword("");
                setErrorMessage("User registered successfully");
            } else {
                setErrorMessage(responseData.message || "Failed to register user");
            }
        } catch (error) {
            console.error("Error occurred during registration:", error);
            setErrorMessage("Error occurred during registration");
        }
    };

    const updateIsclicked=()=>{
        setIsClicked(true)
    }

    const getRegistrationForm=()=>(
        <div className='background-container'>
            <h1 className='company-name'><span style={{ "color": "#e83a05" }}>VOLTUS</span>WAVE</h1>
            <form className='form-card' onSubmit={registerUser}>
                <div className='flex-container'>
                    <label htmlFor='username' className='label'>Username <span style={{ "color": "red" }}>*</span></label>
                    <input placeholder='Enter Username' className='input' onChange={handleUsernameChange} type='text' id="username" required value={username} />
                </div>
                <div className='flex-container'>
                    <label htmlFor='email' className='label'>Email<span style={{ "color": "red" }}>*</span></label>
                    <input placeholder='Enter Email' className='input' onChange={handleEmailChange} type='email' id="email" required value={email} />
                </div>
                <div className='flex-container'>
                    <label htmlFor='password' className='label'>Password<span style={{ "color": "red" }}>*</span></label>
                    <input placeholder='Enter Password' className='input' onChange={handlePasswordChange} type='password' id="password" required value={password} />
                </div>
                <div>
                    <button className='register-btn' type='submit'>Register</button>
                </div>
                {errorMsg && <p className='errMsg'>{errorMsg}</p>}
            </form>
            <button className='register-btn' type='submit' onClick={()=>setIsClicked(false)}>Login</button>
        </div>
    );

    const getLoginForm = () => {
        return <LoginComponent updateIsclicked={updateIsclicked}/>
    
    }


    const getForms = () => {
            if (isClicked) {
                return getRegistrationForm();
            } else {
                return getLoginForm();
            }
        
    };
    
    
    return getForms();
};
    

export default RegistrationComponent;
