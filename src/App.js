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
        <Route path='/' element={<Board></Board>} />
        <Route path='/r/:subredditName' element={<Board></Board>} />
        <Route path='/r/:subredditName/:categoryName' element={<Board></Board>} />
        <Route path='*' element={<NoMatch></NoMatch>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
