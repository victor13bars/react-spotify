import React from 'react';

const PlayListCover = ({url}) => {
    return (
        <img
            src={url}
            className="rounded shadow-lg"
            alt=""
        />
    );
};

export default PlayListCover;