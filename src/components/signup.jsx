import { useState } from "react"
import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";



const SignUp = () => {
    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');
    const {signup} = useAuth(); //wherever we will need the authentication context we will use it 
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault(); //what it does is on click of the submit it prevents the form to send request in a traditional way and hence it waits for the username and password to be verified
        await signup(username,password);
        navigate('/home');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>SignUp</h2>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SignUp;
