import React from 'react';
import PlayListContextMenuItem from "./PlayListContextMenuItem";

const PlayListContextMenu = ({classes, menuItems}, ref) => {

    return (
        <ul ref={ref} className={classes}>
            {menuItems.map(({label, subMenuItems}) =>
                <PlayListContextMenuItem key={label} subMenuItems={subMenuItems}>
                    {label}
                </PlayListContextMenuItem>
            )}
        </ul>
    );
};

export default React.forwardRef(PlayListContextMenu);