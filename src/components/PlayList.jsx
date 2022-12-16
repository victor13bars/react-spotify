import React from 'react';
import PlayListContextMenu from "./PlayListContextMenu";
import PlayListCover from "./PlayListCover";
import PlayListButtonPlay from "./PlayListButtonPlay";
import PlayListTitle from "./PlayListTitle";
import PlayListDescription from "./PlayListDescription";

const menuItems = [
    {
        label: 'to Your Library'
    },
    {
        label: 'Share',
        subMenuItems: [
            {
                label: 'Copy link to playlist'
            },
            {
                label: 'Embed playlist'
            }
        ]
    },
    {
        label: 'About recommendations'
    },
    {
        label: 'Open in Desktop app'
    }
]

const PlayList = ({coverUrl, title, description, classes}) => {
    return (
        <a href="/"
           className={classes}>
            <div className="relative">
                <PlayListCover url={coverUrl}/>
                <PlayListButtonPlay/>
            </div>
            <PlayListTitle title={title}/>
            <PlayListDescription description={description}/>
            <PlayListContextMenu
                menuItems={menuItems}
                classes="absolute top-9 left-9 bg-[#282828] text-[#eaeaea] text-sm divide-y divide-[#3e3e3e] p-1 rounded shadow-xl cursor-default whitespace-nowrap z-10 hidden group-hover:block"
            />
        </a>
    );
};

export default PlayList;