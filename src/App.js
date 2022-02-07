import './App.css';
import NavBar from './components/NavBar';
import Posts from './components/Posts';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Snoowrap from 'snoowrap';
import env from './env.config.json';

function App() {
  const [allPosts, setPosts] = useState([]);

  async function getPosts() {
    const subredditName = "analog";
    const postRequestLimit = 2;
    // reddit rate limit: 60/min
    // Source: https://github.com/reddit-archive/reddit/wiki/API#rules

    // getHot always returns 2 more than specified (bug in snoowrap?)
    const categoryHot = (await r.getSubreddit(subredditName).getHot({limit: postRequestLimit}));
    const categoryNew = (await r.getSubreddit(subredditName).getNew({limit: postRequestLimit}));
    const categoryTop = (await r.getSubreddit(subredditName).getTop({limit: postRequestLimit}));
    const categoryTopHour = (await r.getSubreddit(subredditName).getTop({time: 'hour', limit: postRequestLimit}));
    const categoryTopDay = (await r.getSubreddit(subredditName).getTop({time: 'day', limit: postRequestLimit}));
    const categoryTopWeek = (await r.getSubreddit(subredditName).getTop({time: 'week', limit: postRequestLimit}));
    const categoryTopMonth = (await r.getSubreddit(subredditName).getTop({time: 'month', limit: postRequestLimit}));
    const categoryTopYear = (await r.getSubreddit(subredditName).getTop({time: 'year', limit: postRequestLimit}));
    const categoryTopAll = (await r.getSubreddit(subredditName).getTop({time: 'all', limit: postRequestLimit}));
    const categoryRising = (await r.getSubreddit(subredditName).getRising({limit: postRequestLimit}));

    const postsMap = new Map();
    const posts = (await [
        ...categoryHot, ...categoryNew, ...categoryTop, ...categoryTopHour,
        ...categoryTopDay, ...categoryTopWeek, ...categoryTopMonth,
        ...categoryTopYear, ...categoryTopAll, ...categoryRising
    ]);
    posts.forEach((post) => {
        postsMap.set(post.author_fullname, post);
    });
    const uniquePosts = [...postsMap.values()]


    setPosts(uniquePosts);
  }

  useEffect(() => {
      getPosts();
  })

  const r = new Snoowrap({
    userAgent: env.userAgent,
    clientId: env.clientId,
    clientSecret: env.clientSecret,
    refreshToken: env.refreshToken
  }); 

  return (
    <div classame="App">
      <NavBar></NavBar>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts className="Main" subredditPosts={allPosts}></Posts>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
