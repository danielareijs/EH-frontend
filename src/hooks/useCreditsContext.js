import {CreditsContext} from '../context/CreditContext';
import {useContext} from 'react';

export const useCreditsContext = () => {
    const context = useContext(CreditsContext);

    if(!context){
        throw Error('useCreditsContext must be used inside an CreditContextProvider');
    }

    return context;
}