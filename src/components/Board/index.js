import Post from '../Post';
import Masonry from 'react-masonry-component';
import { useEffect, useState } from 'react';
import Snoowrap from 'snoowrap';
import env from '../../env.config.json';
import { useParams } from 'react-router-dom';

const Posts = ({stateChanger}) => {

    let params = useParams();
    let subredditName = params.subredditName ? params.subredditName: 'analog';
    let categoryName = params.categoryName ? params.categoryName: 'hot';
    let timeName = params.timeName ? params.timeName: 'day';

    const masonryOptions = {
        stagger: 0,
        transitionDuration: '0.3s',
        percentPosition: true,
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const [pageNum, setCount] = useState(0);
    const [allPosts, setPosts] = useState([])
    const [bookmark, setBookmark] = useState(0)
    const [authorName, setAuthName] = useState('')

    
    async function handleScroll(e) {
        console.log("LKASJDKLJASD")
        if (Math.abs(e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight)) <= 1) {
            setCount(pageNum++)
        } else {
            console.log("LKASJDKLJASD")
        }

        // const bottom = Math.abs(e.target.scrollHeight - (Math.ceil(e.target.scrollTop) === e.target.clientHeight))
        // if (bottom) {
        //     setCount(pageNum++)
        // }
    }

    async function getPosts() {
        console.log('UPDATE')
        const postRequestLimit = 25;
        // reddit rate limit: 60/min
        // Source: https://github.com/reddit-archive/reddit/wiki/API#rules

        let params = {limit: postRequestLimit}
        if (pageNum != 0) {
            params.count = bookmark
            params.after = authorName
        }

        var posts

        switch (categoryName) {
            case 'new':
                console.log("YOU HERE?")
                posts = (await r.getSubreddit(subredditName).getNew(params));
                break;
            case 'top':
                params.time = timeName
                posts = (await r.getSubreddit(subredditName).getTop(params));
                break;
            case 'rising':
                posts = (await r.getSubreddit(subredditName).getRising(params));
                break;
            default:
                // getHot always returns 2 more than specified (bug in snoowrap?)
                posts = (await r.getSubreddit(subredditName).getHot(params));
        }

        setAuthName(posts[posts.length - 1].name)
        setBookmark(bookmark + posts.length)
        setPosts(posts);
    }

    useEffect(() => {
        getPosts();
    }, [pageNum])

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
        <div onScroll={console.log("AKLSJD")}>
            <Masonry
                options={masonryOptions}
            >
                {
                    getImages()
                }
            </Masonry>
        </div>
    )
}

export default Posts;
