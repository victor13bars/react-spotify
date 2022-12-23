import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import PlayListContextMenu from "./PlayListContextMenu";
import PlayListCover from "./PlayListCover";
import PlayListButtonPlay from "./PlayListButtonPlay";
import PlayListTitle from "./PlayListTitle";
import PlayListDescription from "./PlayListDescription";
import useContextMenu from "../hooks/useContextMenu";

const PlayList = ({coverUrl, title, description, classes, toggleScrolling}) => {

    const {
        bgClasses,
        openContextMenu,
        isContextMenuOpen,
        contextMenuRef,
        contextMenuItems
    } = useContextMenu(toggleScrolling)

    return (
        <a
            href="/"
            className={`relative p-4 rounded-md duration-200 group ${classes} ${bgClasses}`}
            onContextMenu={openContextMenu}
            onClick={event => event.preventDefault()}
        >
            <div className="relative">
                <PlayListCover url={coverUrl}/>
                <PlayListButtonPlay/>
            </div>
            <PlayListTitle title={title}/>
            <PlayListDescription description={description}/>
            {
                isContextMenuOpen
                &&
                <PlayListContextMenu
                    ref={contextMenuRef}
                    menuItems={contextMenuItems}
                    classes="fixed divide-y divide-[#3e3e3e]"
                />
            }
        </a>
    );
};

export default PlayList;