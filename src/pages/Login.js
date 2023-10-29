import { useState } from "react";
import { useLogin } from "../hooks/useLogin"; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(username, password);

    }

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <form className="auth-form login" onSubmit={handleSubmit}>
                <p>Login</p>
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
                <input disabled={isLoading} type="submit" value="Log in"/>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default Login;