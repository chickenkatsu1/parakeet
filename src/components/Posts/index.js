import Post from '../Post';
import Masonry from 'react-masonry-component';
import { useEffect, useState } from 'react';
import Snoowrap from 'snoowrap';
import env from '../../env.config.json';

const Posts = ( {subredditName} ) => {

    const masonryOptions = {
        stagger: 0,
        transitionDuration: '0.3s',
        percentPosition: true,
    }

    const [allPosts, setPosts] = useState([]);

    async function getPosts() {
        const postRequestLimit = 1;
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

    const getImages = () => {
        return allPosts.map((post) => {
            if (post.media_metadata) {
                return Object.keys(post.media_metadata).map((obj) =>  (<Post key={post.media_metadata[obj].id} media={post.media_metadata[obj].s.u} thumbnail={post.thumbnail} post={post}></Post>));
            } else if (post.url_overridden_by_dest && !post.is_video) {
                return (<Post key={post.id} media={post.url_overridden_by_dest} thumbnail={post.thumbnail} post={post}></Post>)
            }
        })
    }
    return (
        <Masonry
            options={masonryOptions}
        >
            {
                getImages()
            }
        </Masonry>
    )
}

export default Posts;
