import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import {useNavigate} from 'react-router-dom'
import './login.css';
import axios from "axios";


const Login = () =>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [message,setMessage]  = useState('');

    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const data={
            email,
            password,
        };
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', data, {
            headers: {
                'Content-Type': 'application/json',
            },
            });
            if (response.status === 200) {
            setMessage('Login Successful');
            setEmail('');
            setPassword('');
            // navigate('/home');
            console.log(response.data.user.role);
                if(response.data.user.role === 'admin'){
                    navigate('/brand');
                }else{
                    navigate('/user');
           
            };

            } else {
            setMessage(`Error: ${response.data.message}`);
            }
        } catch (error) {
            setMessage('There was an error with Login');
        }
    }

    return(
       
            <div className="login-container">
                <div className="login-card">
                    <h1 className="login-title">🚀 Welcome Back!</h1>
    
                    {message && <div className="login-alert">{message}</div>}
    
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">📧 Email</label>
                            <input
                                type="email"
                                className="form-input"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
    
                            <label htmlFor="password" className="form-label">🔑 Password</label>
                            <input
                                type="password"
                                className="form-input"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
    
                            <button type="submit" className="login-button"> Login</button>
                            <p className="register-text">
                                New here? <a href="/" className="register-link">Register</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

export default Login;