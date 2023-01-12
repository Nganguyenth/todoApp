import {useContext} from 'react';
import ConText from './context';
export const useStore = () =>{
    const [state, dispatch] = useContext(ConText)
    return [state, dispatch]
}