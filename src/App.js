import './App.css';
import {CreateStream} from './CreateStream';
import {SendFunds} from './SendFunds';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <SendFunds />
      <CreateStream /> 
    </div>
  );
}

export default App;
