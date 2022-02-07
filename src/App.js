import './App.css';
import NavBar from './components/NavBar';
import Posts from './components/Posts';
import { useEffect, useState } from 'react';
import Snoowrap from 'snoowrap';
import env from './env.config.json';

function App() {
  const [allPosts, setPosts] = useState([]);

  async function getPosts() {
    const categoryTop = (await r.getSubreddit("analog").getTop());
    const categoryHot = (await r.getSubreddit("analog").getHot());
    const categoryNew = (await r.getSubreddit("analog").getNew());
    const posts = await { ...categoryTop, ...categoryHot, ...categoryNew};
    setPosts(categoryNew);
  }

  useEffect(() => {
      getPosts();
  }, [])

  const r = new Snoowrap({
    userAgent: env.userAgent,
    clientId: env.clientId,
    clientSecret: env.clientSecret,
    refreshToken: env.refreshToken
  }); 

  return (
    <div classame="App">
      <NavBar></NavBar>
      {allPosts.length > 0 && <Posts className="Main" subredditPosts={allPosts}></Posts>}
    </div>
  );
}

export default App;