import React from 'react';
import ProgressiveImage from 'react-progressive-image';

const Post = ({media, thumbnail}) => {
    // console.log(link, post);
    return (
        <ProgressiveImage 
                src={media} placeholder={thumbnail}
            >
                {(src, loading) => <img style={{height: 'auto', width: '33vw', opacity: loading ? 0 : 1}} src={src} alt="" />}
            </ProgressiveImage>
    )
}

export default Post;
