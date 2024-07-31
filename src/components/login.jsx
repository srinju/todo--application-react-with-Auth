import { useState } from "react"
import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [username,setUsername] = useState('');
    const [password , setPassword] = useState('');
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username , password);
        navigate('/home');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login;
