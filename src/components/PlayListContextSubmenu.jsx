import React from 'react';
import PlayListContextItem from "./PlayListContextItem";

const subMenuItems = [
    {
        label: 'Copy link to playlist'
    },
    {
        label: 'Embed playlist'
    }
]

const PlayListContextSubmenu = () => {
    return (
        <ul className="absolute top-0 left-full bg-[#282828] text-[#eaeaea] text-sm p-1 rounded shadow-xl cursor-default">
            {subMenuItems.map(({label}) =>
                <PlayListContextItem key={label}>
                    {label}
                </PlayListContextItem>
            )}
        </ul>
    );
};

export default PlayListContextSubmenu;