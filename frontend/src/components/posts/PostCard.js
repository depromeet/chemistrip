import React from 'react';
import {Thumbnail} from 'react-bootstrap';

const PostCard = ({imageSrc, title, region}) => (
    <Thumbnail
        onClick={()=>console.log("clicked thumbnail")}
        src={imageSrc} alt="thumbnail">
        <h3>{title}</h3>
        <p>{region}</p>
    </Thumbnail>
);

export default PostCard;
