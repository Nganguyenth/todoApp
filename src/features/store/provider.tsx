import Context from './context';
import React, { useReducer } from 'react';
import { reducer, initialState } from './reducer';
function Provider ({ children }: Record<string, React.ReactElement>): React.ReactElement {
  const [state, dispatch] = useReducer((reducer), initialState);
  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  );
}
export default Provider;
