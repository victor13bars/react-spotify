import React from 'react';
import PlayListContextMenuItem from "./PlayListContextMenuItem";


const PlayListContextSubmenu = ({menuItems}) => {
    return (
        <ul className="absolute top-0 left-full bg-[#282828] text-[#eaeaea] text-sm p-1 rounded shadow-xl cursor-default">
            {menuItems.map(({label}) =>
                <PlayListContextMenuItem key={label}>
                    {label}
                </PlayListContextMenuItem>
            )}
        </ul>
    );
};

export default PlayListContextSubmenu;