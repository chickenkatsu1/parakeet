import './App.css';
import NavBar from './components/NavBar';
import Board from './components/Board';
import { BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <div classame='App'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<div><NavBar></NavBar><Board></Board></div>} />
      </Routes>
      <Routes>
        <Route path='/:subredditName' element={<div><NavBar></NavBar><Board></Board></div>} />
      </Routes>
      <Routes>
        <Route path='/:subredditName/:categoryName' element={<div><NavBar></NavBar><Board></Board></div>} />
      </Routes>
      <Routes>
        <Route path='/:subredditName/:categoryName/:timeName' element={<div><NavBar></NavBar><Board></Board></div>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
