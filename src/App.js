import './App.css';
import NavBar from './components/NavBar';
import Board from './components/Board';
import { BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <div classame='App'>
      <NavBar></NavBar>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Board></Board>} />
      </Routes>
      <Routes>
        <Route path='/:subredditName' element={<Board></Board>} />
      </Routes>
      <Routes>
        <Route path='/:subredditName/:categoryName' element={<Board></Board>} />
      </Routes>
      <Routes>
        <Route path='/:subredditName/:categoryName/:timeName' element={<Board></Board>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
