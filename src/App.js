import './App.css';
import NavBar from './components/NavBar';
import Posts from './components/Posts';
import { useEffect, useState } from 'react';
import Snoowrap from 'snoowrap';

function App() {
  const [allPosts, setPosts] = useState([]);

  async function getPosts() {
    const top = (await r.getSubreddit("analog").getTop());
    const hot = (await r.getSubreddit("analog").getHot());
    const posts = await { ...top, ...hot };
    setPosts(top);
  }

  useEffect(() => {
      getPosts();
  }, [])

  const r = new Snoowrap({
    userAgent: 'machine',
    clientId: '2y3S1qDyBM-hEE_K8DfU7A',
    clientSecret: 'hwEFVqHGCAc1Cz_4I07kvB2t8w8OTQ',
    refreshToken: '259354942465-SiEGWbEH7thEBvVNeXEjY1vQAYBXQA'
  }); 

  return (
    <div classame="App">
      <NavBar></NavBar>
      {allPosts.length > 0 && <Posts className="Main" subredditPosts={allPosts}></Posts>}
    </div>
  );
}

export default App;
