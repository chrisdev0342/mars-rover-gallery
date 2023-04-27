import './App.css';
import { Route, Routes } from "react-router-dom"
import Rovers from './pages/Rovers';
import RoverDetail from './pages/RoverDetail';
import SearchAppBar from './pages/SearchAppBar/index'

function App() {


  return (
    <>
      <SearchAppBar />
      <Routes>
        <Route path="/" element={<Rovers />} />
        <Route path="/rovers/:name" element={<RoverDetail />} />
      </Routes>
    </>
  );
}

export default App;
