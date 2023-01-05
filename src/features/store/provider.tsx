import Context from "./context";
import { useReducer } from "react";
import logger from "./logger";
import {reducer, initialState } from "./reducer";
function Provider({ children }){
    const [state, dispatch] = useReducer(logger(reducer), initialState);
    return(
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}
export default Provider
