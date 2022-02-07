import './App.css';
import NavBar from './components/NavBar';
import Posts from './components/Posts';
import { BrowserRouter, Routes, Route} from "react-router-dom"

function App() {

  return (
    <div classame="App">
      <NavBar></NavBar>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts className="Main" subredditName={"analog"}></Posts>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
