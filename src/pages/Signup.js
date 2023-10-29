import { useState } from 'react';
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {signup, error, isLoading} = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(username, password);

    }

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <form className="auth-form signup" onSubmit={handleSubmit}>
                <p>Sign up</p>
                <label>Username
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                </label>
                <label>Password
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </label>
            
                <input disabled={isLoading} type="submit" value="Sign up"/>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default Signup;