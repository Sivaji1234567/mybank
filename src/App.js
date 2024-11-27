import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Opencd from './components/Opencd';
import DisplayCD from './components/DisplayCD';
import Managecd from './components/Managecd';
import Closecd from './components/Closecd';
import Tiles from './Tiles';
import Fundcd from './components/Fundcd';
function App() {
  return (
    <div className='app'>
      <h1 style={{color:"white"}}>Mybank</h1>
       <Router>
        <div>
          <Routes>
          <Route path="/" element={<Tiles />} />
          <Route path="/open_cd" element={<Opencd />} />
          <Route path="/display_cd" element={<DisplayCD />} />
          <Route path="/manage_cd" element={<Managecd />} />
          <Route path="/close_cd" element={<Closecd />} />
          <Route path='/fund_cd'  element={<Fundcd/>} />
          </Routes>
        </div>
       </Router>
    </div>
  );
}

export default App;
