import React from 'react';
import Todo from './features/Todo'
import Provider from './features/store/provider'

function App (): JSX.Element {
  return (
    <React.Fragment>
      <Provider>
        <Todo/>
      </Provider>
    </React.Fragment>
  );
}

export default App;
