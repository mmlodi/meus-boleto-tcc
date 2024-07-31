import './App.css';
import HomePage from "./pages/HomePage";
import Header from './components/Header';
import { useState } from 'react';

function App() {

  const [login, setLogin] = useState(false);

  return (
    <div className="App">
       <Header setLogin={setLogin} />
      <h1>
        <HomePage/>
      </h1>
    </div>
  );
}

export default App;
