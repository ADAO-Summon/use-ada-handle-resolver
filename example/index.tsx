import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useAdaHandleResolver } from '../.';


const BLOCKFROST_PROJECT_ID = `<project_id>`
const App = () => {

  const { address, handleInputChangeDebounced } = useAdaHandleResolver({ blockfrostProjectId: BLOCKFROST_PROJECT_ID, delay: 500 })

  return (
    <form>
      <input type={'text'} onChange={handleInputChangeDebounced} />
      {address ? `Resolved as ${address}` : ``}
    </form>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
