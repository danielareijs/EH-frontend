import {createContext, useReducer} from 'react';

export const CreditsContext = createContext();

export const creditsReducer = (state, action) => {
    switch (action.type){
        case 'SET_CREDITS':
            return {
                credits: action.payload
            }
        case 'CREATE_CREDIT':
            return {
                credits: [action.payload, ...state.credits]
            }
        case 'DELETE_CREDIT':
            return {
                credits: state.credits.filter(credit => credit._id != action.payload._id)
            }
        default:
            return state
    }
}

export const CreditsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(creditsReducer, {
        credits: null
    });

    return (
        <CreditsContext.Provider value={{...state, dispatch}}>
            {children}
        </CreditsContext.Provider>
    )
}