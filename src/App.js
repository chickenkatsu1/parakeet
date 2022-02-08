import './App.css';
import NavBar from './components/NavBar';
import Posts from './components/Posts';
import { BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <div classame='App'>
      <NavBar></NavBar>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Posts></Posts>} />
      </Routes>
      <Routes>
        <Route path='/:subredditName' element={<Posts></Posts>} />
      </Routes>
      <Routes>
        <Route path='/:subredditName/:categoryName' element={<Posts></Posts>} />
      </Routes>
      <Routes>
        <Route path='/:subredditName/:categoryName/:time' element={<Posts></Posts>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
