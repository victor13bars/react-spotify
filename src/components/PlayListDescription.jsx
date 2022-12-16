import React from 'react';

const PlayListDescription = ({description}) => {
    return (
        <p className="text-sm text-[#b3b3b3] line-clamp-2">
            {description}
        </p>
    );
};

export default PlayListDescription;