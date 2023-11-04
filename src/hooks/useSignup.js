import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    const signup = async (username, password) => {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`${serverUrl}/user/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        })

        const json = await response.json();

        if(!response.ok){
            setIsLoading(false);
            setError(json.error);
        }
        if(response.ok){
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false);
        }
    }

    return {signup, isLoading, error};
}