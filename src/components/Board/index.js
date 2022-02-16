import Post from '../Post';
import Masonry from '@mui/lab/Masonry';
import { useEffect, useState, useRef } from 'react';
import Snoowrap from 'snoowrap';
import env from '../../env.config.json';
import { useParams, useSearchParams } from 'react-router-dom';
import NoMatch from '../NoMatch';

const Board = () => {
    let params = useParams();
    const listInnerRef = useRef();
    const [searchParams] = useSearchParams();

    let subredditName = params.subredditName ? params.subredditName: 'analog';
    let categoryName = params.categoryName ? params.categoryName: 'hot';
    let timeName = searchParams.has('t') ? searchParams.get('t'): 'day';

    const [allPosts, setPosts] = useState([]);

    useEffect(() => {

        const r = new Snoowrap({
            userAgent: env.userAgent,
            clientId: env.clientId,
            clientSecret: env.clientSecret,
            refreshToken: env.refreshToken
        });

        async function getPosts() {
            const postRequestLimit = 25;
            // reddit rate limit: 60/min
            // Source: https://github.com/reddit-archive/reddit/wiki/API#rules

            let posts = null;

            try {
                switch (categoryName) {
                    case 'hot':
                        // getHot always returns 2 more than specified (bug in snoowrap?)
                        posts = (await r.getSubreddit(subredditName).getHot({limit: postRequestLimit}));
                        break;
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
                        break;
                }
            } catch (error) {}

            setPosts(posts);
        }
        getPosts();
    }, [categoryName, subredditName, timeName])

    const getImages = () => {
        return allPosts.map((post) => {
            if (post.media_metadata) {
                return Object.keys(post.media_metadata).map((obj) =>  (<Post key={post.media_metadata[obj].id} media={post.media_metadata[obj].s.u} thumbnail={post.thumbnail} post={post}></Post>));
            } else if (post.url_overridden_by_dest && !post.is_video) {
                return (<Post key={post.id} media={post.url_overridden_by_dest} thumbnail={post.thumbnail} post={post}></Post>)
            } else
                return null;
        })
    }

    const onScroll = () => {
        console.log('scrolling!!!');
        // if (listInnerRef.current) {
        //     const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
        //     if (scrollTop + clientHeight === scrollHeight) {
        //         console.log("reached bottom");
        //     }
        // }
    };

    try {
        return (
            <div onScroll={console.log('scrolling!')} ref={listInnerRef}>
                <Masonry columns={4} spacing={1}>
                    {
                        getImages()
                    }
                </Masonry>
            </div>
        )
    } catch (error) {
        return (<NoMatch/>)
    }
}

export default Board;
