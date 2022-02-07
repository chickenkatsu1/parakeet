import React, { useState } from 'react';
import ProgressiveImage from 'react-progressive-image';
import ImgurEmbed from 'react-imgur-embed';

const Post = ({media, thumbnail}) => {
    // console.log(link, post);
    return (
        <ProgressiveImage 
                src={media} placeholder={thumbnail}
            >
                {(src, loading) => <img style={{height: 'auto', width: '33vw', opacity: loading ? 0 : 1}} src={src} alt="an image" />}
            </ProgressiveImage>
    )
}

export default Post;