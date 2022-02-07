import './App.css';
import NavBar from './components/NavBar';
import Posts from './components/Posts';
import { useEffect, useState } from 'react';
import Snoowrap from 'snoowrap';
import env from './env.config.json';

function App() {
  const [allPosts, setPosts] = useState([]);

  async function getPosts() {
    const subredditName = "analog";
    const postLimit = 53;
    let bookmark = postLimit*2;
    let lastAuthorFullname = "t2_558xc";
    var categoryTop = null;
    if (bookmark === 0) {
        categoryTop = (await r.getSubreddit(subredditName).getTop(
            {limit: postLimit}
        ));
    } else {
        categoryTop = (await r.getSubreddit(subredditName).getTop(
            {limit: postLimit, count: bookmark, after: lastAuthorFullname}
        ));
    }
    console.log(categoryTop)
    lastAuthorFullname = categoryTop[categoryTop.length - 1].author_fullname
    bookmark += postLimit;

      // TODO: add times for Top
    const categoryHot = (await r.getSubreddit(subredditName).getHot());
    const categoryNew = (await r.getSubreddit(subredditName).getNew());
    const categoryRising = (await r.getSubreddit(subredditName).getRising());
    const posts = await { ...categoryTop, ...categoryHot, ...categoryNew,
                          ...categoryRising};
    setPosts(categoryTop);
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
      {allPosts.length > 0 && <Posts className="Main" subredditPosts={allPosts}></Posts>}
    </div>
  );
}

export default App;
