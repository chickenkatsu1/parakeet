import './App.css';
import NavBar from './components/NavBar';
import Board from './components/Board';
import NoMatch from './components/NoMatch';
import { BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <div classame='App'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<div><NavBar></NavBar><Board></Board></div>} />
        <Route path='/r/:subredditName' element={<div><NavBar></NavBar><Board></Board></div>} />
        <Route path='/r/:subredditName/:categoryName' element={<div><NavBar></NavBar><Board></Board></div>} />
        <Route path='*' element={<div><NavBar></NavBar><NoMatch></NoMatch></div>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
