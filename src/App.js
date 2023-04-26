import './App.css';
import { Route, Routes } from "react-router-dom"
import Rovers from './pages/Rovers';


function App() {


  return (
    <Routes>
      <Route path="/" element={<Rovers />} />
    </Routes>
  );
}

export default App;
