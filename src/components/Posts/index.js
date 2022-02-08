import Post from '../Post';
import Masonry from 'react-masonry-component';
import { useEffect, useState } from 'react';
import Snoowrap from 'snoowrap';
import env from '../../env.config.json';
import { useParams } from 'react-router-dom';

const Posts = () => {

    let params = useParams();
    let subredditName = params.subredditName ? params.subredditName: 'analog';
    let categoryName = params.categoryName ? params.categoryName: 'hot';
    let timeName = params.timeName ? params.timeName: 'day';

    const masonryOptions = {
        stagger: 0,
        transitionDuration: '0.3s',
        percentPosition: true,
    }

    const [allPosts, setPosts] = useState([]);

    async function getPosts() {
        const postRequestLimit = 25;
        // reddit rate limit: 60/min
        // Source: https://github.com/reddit-archive/reddit/wiki/API#rules

        let posts = (await r.getSubreddit(subredditName).getHot({limit: postRequestLimit}));

        switch (categoryName) {
            case 'new':
                posts = (await r.getSubreddit(subredditName).getNew({limit: postRequestLimit}));
                break;
            case 'top':
                posts = (await r.getSubreddit(subredditName).getTop({time: timeName, limit: postRequestLimit}));
                break;
            case 'rising':
                posts = (await r.getSubreddit(subredditName).getRising({limit: postRequestLimit}));
                break;
            default:
                // getHot always returns 2 more than specified (bug in snoowrap?)
                posts = (await r.getSubreddit(subredditName).getHot({limit: postRequestLimit}));
        }

        setPosts(posts);
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
