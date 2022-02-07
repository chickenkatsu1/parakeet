import Post from '../Post';
import Masonry from 'react-masonry-component';

const Posts = ({ subredditPosts }) => {
    const masonryOptions = {
        stagger: 0,
        transitionDuration: '0.3s',
        percentPosition: true,
    }
    const getImages = () => {
        return subredditPosts.map((post) => {
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